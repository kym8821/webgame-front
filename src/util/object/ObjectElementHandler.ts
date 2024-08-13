import { MapManager } from "../map/mapManager";
import { CanvasManager } from "./CanvasManager";
import { CanvasObjectManager } from "./canvasObjectManager";
import { ObjectFrame } from "./objectFrame";

export default interface ObjectElementHandler<T extends CanvasManager> {
  manager: T | undefined;
  mapManager: MapManager;
  reDraw: Function;
  drawNext: Function;
  animate: Function;
}
