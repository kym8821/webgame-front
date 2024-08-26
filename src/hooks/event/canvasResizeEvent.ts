import { CanvasManager } from '../../util/object/objectManager/CanvasManager';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { getCurrentBlockSize } from '../../util/windowSize';

function resizeScreen(objectManager: CanvasManager) {
  const { canvasRef } = objectManager;
  if (!canvasRef || !canvasRef.current) return;
  const canvas: HTMLCanvasElement = canvasRef.current;
  canvasRef.current.width = canvas.clientWidth;
  canvasRef.current.height = canvasRef.current.width / 2;
}

function handleResize(e: UIEvent, totalElementHandler: TotalElementHandler, canvasWidth: number, canvasHeight: number) {
  e.preventDefault();
  if (!totalElementHandler) return;
  const currentBlockSize = getCurrentBlockSize(
    canvasWidth,
    canvasHeight,
    totalElementHandler.mapHandler.manager.numberMap
  );
  if (currentBlockSize) {
    totalElementHandler.mapHandler.manager.blockSize = currentBlockSize;
    totalElementHandler.redrawScreenLists.forEach((handler) => {
      resizeScreen(handler.managerClass.manager);
      handler.reDraw();
    });
  }
}

const canvasResizeEvent = { handleResize };
export default canvasResizeEvent;
