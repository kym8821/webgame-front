import { MapManager } from "../map/mapManager";
import { CanvasManager } from "./objectManager/CanvasManager";

export default interface ObjectElementHandler<T extends CanvasManager> {
  manager: T;
  mapManager: MapManager | undefined;
  reDraw: Function;
  drawNext: Function;
  animate: Function;
}
