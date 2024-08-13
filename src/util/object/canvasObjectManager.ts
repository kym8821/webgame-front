import { AnimationFrameInfo } from "./animationFrameInfo";
import { CanvasManager } from "./CanvasManager";
import { ObjectFrame, ObjectFrameClassType } from "./objectFrame";

export interface CanvasObjectManager<T1 extends ObjectFrameClassType<T2>, T2 extends ObjectFrame> extends CanvasManager {
  objects: T1[];
}

export interface CanvasObjectManagerClassType<T extends CanvasManager> {
  manager: T;
  delete: Function;
  add: Function;
}
