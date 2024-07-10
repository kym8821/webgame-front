import { CanvasManager } from "../object/CanvasManager";

export interface MapManager extends CanvasManager {
  map: number[][];
  blockSize: number;
}
