import { AnimationFrameInfo } from "./animationFrameInfo";
import { CanvasObjectManager } from "./canvasObjectManager";
import { ObjectFrame, ObjectFrameClassType } from "./objectFrame";

export interface CanvasObjectFrameManager<T1 extends ObjectFrameClassType<T2>, T2 extends ObjectFrame> extends CanvasObjectManager<T1, T2> {
  animationFrame?: AnimationFrameInfo | undefined;
  generationFrame?: AnimationFrameInfo | undefined;
  movementFrame?: AnimationFrameInfo | undefined;
}
