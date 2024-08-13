import { AnimationFrameInfo } from "./animationFrameInfo";
import { CanvasManager } from "./CanvasManager";

export interface CanvasObjectManager extends CanvasManager {
  generationFrame: AnimationFrameInfo | undefined;
  movementFrame: AnimationFrameInfo;
}

export interface CanvasObjectManagerClassType<T extends CanvasManager> {
  manager: T;
  delete: Function;
  add: Function;
}
