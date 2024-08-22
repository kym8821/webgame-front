import { AnimationFrameInfo } from "../../animationFrameInfo";
import { CanvasObjectManager } from "./canvasObjectManager";
import { ObjectFrame, ObjectFrameClassType } from "../objectFrame";
import { ObjectInfo } from "../objectInfo";

export interface CanvasObjectFrameManager<T1 extends ObjectFrameClassType<T2, T3>, T2 extends ObjectFrame<T3>, T3 extends ObjectInfo>
  extends CanvasObjectManager<T1, T2, T3> {
  animationFrame?: AnimationFrameInfo | undefined;
  generationFrame?: AnimationFrameInfo | undefined;
  movementFrame?: AnimationFrameInfo | undefined;
}
