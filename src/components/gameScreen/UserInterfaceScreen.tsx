import { useEffect, useRef } from "react";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import style from "../../assets/css/gameScreen.module.css";
import { getCurrentBlockSize } from "../../util/windowSize";
import { Resource } from "../../util/resource";
import { TotalScreenManager } from "../../util/totalScreenManager";
import { TotalElementHandler } from "../../util/totalElementHandler";
import ObjectElementHandler from "../../util/object/ObjectElementHandler";
import { CanvasManager } from "../../util/object/objectManager/CanvasManager";
import { SelectedComponent } from "../../util/SelectedComponent";

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
  minScale: number;
  maxScale: number;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const UserInterfaceScreen = ({
  totalScreenManager,
  totalElementHandler,
  selectedComponent,
  resource,
  setResource,
}: UserInterfaceScreen) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const transformInfoRef = useRef<TransformInfo>({
    scale: 1,
    panning: false,
    viewPos: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
    minScale: 1,
    maxScale: 10,
  });

  useEffect(() => {
    if (!totalScreenManager || !totalElementHandler) return;
    function setCanvasAndContext() {
      if (!totalScreenManager) return;
      // set canvas
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
      // set context
      const context = canvasRef.current.getContext("2d");
      if (!context) return;
      contextRef.current = context;
      totalScreenManager.userScreenManager.canvasRef = canvasRef;
      totalScreenManager.userScreenManager.contextRef = contextRef;
    }
    setCanvasAndContext();
    draw();
    if (!canvasRef.current || !contextRef.current) return;
    canvasRef.current.onresize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
    };
    canvasRef.current.onclick = (e: MouseEvent) => {
      handleCanvasClickEvent(e, totalScreenManager, totalElementHandler, selectedComponent, resource, setResource);
    };

    const handleResize = debounce((e: UIEvent) => {
      e.preventDefault();
      function resizeScreen(objectManager: CanvasManager) {
        const { canvasRef } = objectManager;
        if (!canvasRef || !canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvasRef.current.width = canvas.clientWidth;
        canvasRef.current.height = canvasRef.current.width / 2;
      }
      if (!totalScreenManager || !canvasRef.current) return;
      const currentBlockSize = getCurrentBlockSize(
        canvasRef.current.clientWidth,
        canvasRef.current.height,
        totalScreenManager.mapManager.manager.numberMap
      );
      console.log(canvasRef.current.width, canvasRef.current.scrollWidth, canvasRef.current.clientWidth);
      if (currentBlockSize) {
        totalScreenManager.mapManager.manager.blockSize = currentBlockSize;
        totalElementHandler.redrawScreenLists.forEach((handler) => {
          resizeScreen(handler.manager);
          handler.reDraw();
        });
      }
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalElementHandler, totalScreenManager, selectedComponent, resource]);

  const setTransform = (handler: ObjectElementHandler<CanvasManager>) => {
    if (!totalElementHandler) return;
    if (!handler.manager) return;
    if (!handler.manager.contextRef || !handler.manager.contextRef.current) return;
    const context = handler.manager.contextRef.current;
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

  const handleWheelMove = (e: React.WheelEvent) => {
    if (e.ctrlKey) return;
    console.log("wheel");
    if (!totalScreenManager) return;
    const mapManager = totalScreenManager.mapManager.manager;
    if (!mapManager.canvasRef || !mapManager.canvasRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;

    const { maxScale, minScale } = transformInfoRef.current;
    const viewPos = transformInfoRef.current.viewPos;
    const scale = transformInfoRef.current.scale;
    const scaledX = (offsetX - viewPos.x) / scale;
    const scaledY = (offsetY - viewPos.y) / scale;
    const delta = -e.deltaY;
    const newScale = delta > 0 ? scale * 1.2 : scale / 1.2;
    if (newScale > maxScale || newScale < minScale) return;
    transformInfoRef.current.scale = newScale;
    viewPos.x = Math.min(0, Math.max(viewPos.x, offsetX - scaledX * newScale));
    viewPos.y = Math.min(0, Math.max(viewPos.y, offsetY - scaledY * newScale));
    transformInfoRef.current.viewPos = viewPos;
    draw();
  };

  const draw = () => {
    if (!totalElementHandler) return;
    totalElementHandler.transformScreenLists.map((handler) => {
      if (!handler.manager) return;
      if (!handler.manager.canvasRef || !handler.manager.canvasRef.current) return;
      const canvasRef = handler.manager.canvasRef;
      if (canvasRef.current) canvasRef.current.width = canvasRef.current.width;
      setTransform(handler);
      handler.reDraw();
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!totalScreenManager) return;
    if (!transformInfoRef.current.panning) return;
    const mapManager = totalScreenManager.mapManager.manager;
    if (!mapManager.canvasRef || !mapManager.canvasRef.current) return;
    e.preventDefault();

    const scale = transformInfoRef.current.scale;
    const [mapWidth, mapHeight] = [
      mapManager.map[0].length * mapManager.blockSize * scale,
      mapManager.map.length * mapManager.blockSize * scale,
    ];
    const [canvasWidth, canvasHeight] = [mapManager.canvasRef.current.clientWidth, mapManager.canvasRef.current.clientHeight];
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);
    const startPos = transformInfoRef.current.startPos;
    const viewPos = {
      x: offsetX - startPos.x,
      y: offsetY - startPos.y,
    };
    viewPos.x = Math.min(0, Math.max(viewPos.x, canvasWidth - mapWidth));
    viewPos.y = Math.min(0, Math.max(viewPos.y, canvasHeight - mapHeight));

    transformInfoRef.current.viewPos = viewPos;
    draw();
  };

  return (
    <div className={`${style.gameScreen} ${style.clickEventScreen}`} style={{ zIndex: 10 }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onWheel={handleWheelMove}
      />
    </div>
  );
};

export default UserInterfaceScreen;
