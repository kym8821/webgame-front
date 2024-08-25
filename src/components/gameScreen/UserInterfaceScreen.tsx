import { useEffect, useRef } from 'react';
import { handleCanvasClickEvent } from '../../util/canvasClickEvent';
import style from '../../assets/css/gameScreen.module.css';
import { getCurrentBlockSize } from '../../util/windowSize';
import { Resource } from '../../util/resource';
import { TotalScreenManager } from '../../util/totalScreenManager';
import { TotalElementHandler } from '../../util/totalElementHandler';
import ObjectElementHandler from '../../util/object/ObjectElementHandler';
import { CanvasManager } from '../../util/object/objectManager/CanvasManager';
import { SelectedComponent } from '../../util/SelectedComponent';
import { Coordinate } from '../../util/Position';
import { CanvasObjectManager, CanvasObjectManagerClassType } from '../../util/object/objectManager/canvasObjectManager';

interface UserInterfaceScreen {
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
  selectedComponent: SelectedComponent | null;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
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
  const draggingStateRef = useRef<Boolean>(false);

  useEffect(() => {
    if (!totalScreenManager || !totalElementHandler) return;
    function setCanvasAndContext() {
      if (!totalScreenManager) return;
      // set canvas
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
      // set context
      const context = canvasRef.current.getContext('2d');
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
      if (draggingStateRef.current) return;
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
          resizeScreen(handler.managerClass.manager);
          handler.reDraw();
        });
      }
    }, 100);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [totalElementHandler, totalScreenManager, selectedComponent, resource]);

  const setTransform = (
    handler: ObjectElementHandler<CanvasObjectManagerClassType<CanvasObjectManager<any, any, any>, any, any, any>>
  ) => {
    if (!totalElementHandler) return;
    if (!handler.managerClass) return;
    if (!handler.managerClass.manager.contextRef || !handler.managerClass.manager.contextRef.current) return;
    const context = handler.managerClass.manager.contextRef.current;
    const mapManager = totalElementHandler.mapHandler.manager;
    const transformInfo = mapManager.transformInfo;
    context.setTransform(
      transformInfo.scale,
      0,
      0,
      transformInfo.scale,
      transformInfo.viewPos.posX,
      transformInfo.viewPos.posY
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!totalElementHandler) return;
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    const mapManager = totalElementHandler.mapHandler.manager;
    mapManager.transformInfo.panning = true;
    const lastViewPos = mapManager.transformInfo.viewPos;
    mapManager.transformInfo.startPos = {
      posX: offsetX - lastViewPos.posX,
      posY: offsetY - lastViewPos.posY,
    };
    draggingStateRef.current = false;
  };

  const handleMouseUp = () => {
    if (!totalElementHandler) return;
    const mapManager = totalElementHandler.mapHandler.manager;
    mapManager.transformInfo.panning = false;
  };

  const handleMouseOut = () => {
    if (!totalElementHandler) return;
    const mapManager = totalElementHandler.mapHandler.manager;
    mapManager.transformInfo.panning = false;
  };

  const handleWheelMove = (e: React.WheelEvent) => {
    if (e.ctrlKey) return;
    if (!totalScreenManager) return;
    const mapManager = totalScreenManager.mapManager.manager;
    const transformInfo = mapManager.transformInfo;
    if (!mapManager.canvasRef || !mapManager.canvasRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;

    const { maxScale, minScale, viewPos, scale } = transformInfo;
    const scaledX = (offsetX - viewPos.posX) / scale;
    const scaledY = (offsetY - viewPos.posY) / scale;
    const delta = -e.deltaY;
    const newScale = delta > 0 ? scale * 1.2 : scale / 1.2;
    if (newScale > maxScale || newScale < minScale) return;
    transformInfo.scale = newScale;
    viewPos.posX = Math.min(0, Math.max(viewPos.posX, offsetX - scaledX * newScale));
    viewPos.posY = Math.min(0, Math.max(viewPos.posY, offsetY - scaledY * newScale));
    transformInfo.viewPos = viewPos;
    draw();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!totalScreenManager) return;
    draggingStateRef.current = true;
    const mapManager = totalScreenManager.mapManager.manager;
    if (!mapManager.transformInfo.panning) return;
    if (!mapManager.canvasRef || !mapManager.canvasRef.current) return;
    e.preventDefault();
    const transformInfo = mapManager.transformInfo;
    const scale = transformInfo.scale;
    const [mapWidth, mapHeight] = [
      mapManager.map[0].length * mapManager.blockSize * scale,
      mapManager.map.length * mapManager.blockSize * scale,
    ];
    const [canvasWidth, canvasHeight] = [
      mapManager.canvasRef.current.clientWidth,
      mapManager.canvasRef.current.clientHeight,
    ];
    const { offsetX, offsetY } = e.nativeEvent;
    const startPos = transformInfo.startPos;
    const viewPos: Coordinate = {
      posX: offsetX - startPos.posX,
      posY: offsetY - startPos.posY,
    };
    viewPos.posX = Math.min(0, Math.max(viewPos.posX, canvasWidth - mapWidth));
    viewPos.posY = Math.min(0, Math.max(viewPos.posY, canvasHeight - mapHeight));
    transformInfo.viewPos = viewPos;
    draw();
  };

  const draw = () => {
    if (!totalElementHandler) return;
    totalElementHandler.transformScreenLists.map((handler) => {
      if (!handler.managerClass.manager) return;
      if (!handler.managerClass.manager.canvasRef || !handler.managerClass.manager.canvasRef.current) return;
      const canvasRef = handler.managerClass.manager.canvasRef;
      if (canvasRef.current) canvasRef.current.width = canvasRef.current.width;
      setTransform(handler);
      handler.reDraw();
    });
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
