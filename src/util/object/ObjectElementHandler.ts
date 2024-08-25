import { MapManager } from '../map/mapManager';
import { CanvasManager } from './objectManager/CanvasManager';
import { CanvasObjectManagerClass, CanvasObjectManagerClassType } from './objectManager/canvasObjectManager';

export default interface ObjectElementHandler<T extends CanvasObjectManagerClassType<any, any, any, any>> {
  managerClass: T;
  mapManager: MapManager | undefined;
  reDraw: Function;
  drawNext: Function;
  animate: Function;
  reset: Function;
}
