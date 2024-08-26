import ObjectElementHandler from '../../util/object/ObjectElementHandler';
import { CanvasObjectManager, CanvasObjectManagerClassType } from '../../util/object/objectManager/canvasObjectManager';
import { Coordinate } from '../../util/Position';
import { TotalElementHandler } from '../../util/totalElementHandler';

const setTransform = (
  handler: ObjectElementHandler<CanvasObjectManagerClassType<CanvasObjectManager<any, any, any>, any, any, any>>,
  totalElementHandler: TotalElementHandler
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

const handleMouseDown = (
  e: React.MouseEvent,
  totalElementHandler: TotalElementHandler,
  draggingStateRef: React.MutableRefObject<Boolean>
) => {
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

const handleMouseUp = (totalElementHandler: TotalElementHandler) => {
  if (!totalElementHandler) return;
  const mapManager = totalElementHandler.mapHandler.manager;
  mapManager.transformInfo.panning = false;
};

const handleMouseOut = (totalElementHandler: TotalElementHandler) => {
  if (!totalElementHandler) return;
  const mapManager = totalElementHandler.mapHandler.manager;
  mapManager.transformInfo.panning = false;
};

const handleWheelMove = (e: React.WheelEvent, totalElementHandler: TotalElementHandler) => {
  if (e.ctrlKey) return;
  if (!totalElementHandler) return;
  const mapManager = totalElementHandler.mapHandler.manager;
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
  draw(totalElementHandler);
};

const handleMouseMove = (
  e: React.MouseEvent,
  totalElementHandler: TotalElementHandler,
  draggingStateRef: React.MutableRefObject<Boolean>
) => {
  if (!totalElementHandler) return;
  draggingStateRef.current = true;
  const mapManager = totalElementHandler.mapHandler.manager;
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
  draw(totalElementHandler);
};

const draw = (totalElementHandler: TotalElementHandler) => {
  if (!totalElementHandler) return;
  totalElementHandler.transformScreenLists.map((handler) => {
    if (!handler.managerClass.manager) return;
    if (!handler.managerClass.manager.canvasRef || !handler.managerClass.manager.canvasRef.current) return;
    const canvasRef = handler.managerClass.manager.canvasRef;
    if (canvasRef.current) canvasRef.current.width = canvasRef.current.width;
    setTransform(handler, totalElementHandler);
    handler.reDraw();
  });
};

const canvasMoveEvent = { handleMouseDown, handleMouseUp, handleMouseMove, handleMouseOut, handleWheelMove, draw };

export default canvasMoveEvent;
