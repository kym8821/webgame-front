import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { useEffect, useRef } from "react";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import style from "../../assets/css/gameScreen.module.css";
import { CanvasObjectManagerClass } from "../../util/object/objectManager/canvasObjectManager";
import MonsterElementHandler from "../../util/monster/monsterElementHandler";
import { getCurrentBlockSize } from "../../util/windowSize";
import MapElementHandler from "../../util/map/mapElementHandler";
import FacilityElementHandler from "../../util/facility/facilityElementHandler";
import { Resource } from "../../util/resource";
import { TotalScreenManager } from "../../util/totalScreenManager";
import { TotalElementHandler } from "../../util/totalElementHandler";

interface UserInterfaceScreen {
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
  selectedComponent: SelectedComponent | null;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

interface Pos {
  x: number;
  y: number;
}

interface TransformInfo {
  scale: number;
  panning: boolean;
  viewPos: Pos;
  startPos: Pos;
}

const UserInterfaceScreen = ({
  totalScreenManager,
  totalElementHandler,
  selectedComponent,
  resource,
  setResource,
}: UserInterfaceScreen) => {
  const transformInfoRef = useRef<TransformInfo>({
    scale: 1,
    panning: false,
    viewPos: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (!totalScreenManager || !totalElementHandler) return;
    const { canvasRef, contextRef } = totalScreenManager.userScreenManager;
    // set canvas
    if (!canvasRef.current) return;
    canvasRef.current.width = canvasRef.current.scrollWidth;
    canvasRef.current.height = canvasRef.current.width / 2;
    // set context
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    contextRef.current = context;
    draw();

    canvasRef.current.onresize = () => {
      const { canvasRef } = totalScreenManager.userScreenManager;
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
    };
    canvasRef.current.onclick = (e: MouseEvent) => {
      handleCanvasClickEvent(e, totalScreenManager, totalElementHandler, selectedComponent, resource, setResource);
    };
    window.addEventListener("resize", () => {
      function resizeScreen(objectManager: CanvasObjectManagerClass<any, any, any>) {
        const [canvas, context] = [objectManager.manager.canvasRef.current, objectManager.manager.contextRef.current];
        if (!canvas || !context) return;
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.width / 2;
      }
      if (!totalScreenManager || !canvasRef.current) return;
      const currentBlockSize = getCurrentBlockSize(canvasRef.current.scrollWidth, totalScreenManager.mapManager.manager.numberMap);
      if (currentBlockSize) {
        const facilityHandler = new FacilityElementHandler(
          totalScreenManager.facilityManager.manager,
          totalScreenManager.mapManager.manager
        );
        const mapHandler = new MapElementHandler(totalScreenManager.mapManager.manager);
        totalScreenManager.mapManager.manager.blockSize = currentBlockSize;
        resizeScreen(totalScreenManager.mapManager);
        resizeScreen(totalScreenManager.launcherManager);
        resizeScreen(totalScreenManager.projectileManager);
        resizeScreen(totalScreenManager.mapManager);
        resizeScreen(totalScreenManager.facilityManager);
        totalScreenManager.mapManager.manager.blockSize = currentBlockSize;
        facilityHandler.reDraw();
        mapHandler.reDraw();
      }
    });
  }, [selectedComponent, resource]);

  const setTransform = () => {
    if (!totalScreenManager) return;
    const canvas = totalScreenManager.monsterManager.manager.canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    //const context = monsterRef.current.contextRef.current;
    if (!context) return;
    const transformInfo = transformInfoRef.current;
    context.setTransform(transformInfo.scale, 0, 0, transformInfo.scale, transformInfo.viewPos.x, transformInfo.viewPos.y);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    transformInfoRef.current.panning = true;
    const lastViewPos = transformInfoRef.current.viewPos;
    transformInfoRef.current.startPos = {
      x: offsetX - lastViewPos.x,
      y: offsetY - lastViewPos.y,
    };
  };

  const handleMouseUp = () => {
    transformInfoRef.current.panning = false;
  };

  const handleMouseOut = () => {
    transformInfoRef.current.panning = false;
  };

  const draw = () => {
    if (!totalScreenManager) return;
    const { canvasRef, contextRef } = totalScreenManager.monsterManager.manager;
    if (!canvasRef.current) return;
    canvasRef.current.width = canvasRef.current.width;
    setTransform();
    const monsterHandler = new MonsterElementHandler(totalScreenManager.monsterManager.manager, totalScreenManager.mapManager.manager);
    monsterHandler.reDraw();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();

    if (!transformInfoRef.current.panning) return;
    const lastStartPos = transformInfoRef.current.startPos;
    transformInfoRef.current.viewPos = {
      x: offsetX - lastStartPos.x,
      y: offsetY - lastStartPos.y,
    };
    draw();
  };

  return (
    <div className={`${style.gameScreen} ${style.clickEventScreen}`} style={{ zIndex: 10 }}>
      {totalScreenManager && (
        <canvas
          ref={totalScreenManager.userScreenManager.canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
        />
      )}
    </div>
  );
};

export default UserInterfaceScreen;
