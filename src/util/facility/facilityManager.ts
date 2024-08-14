import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectFrameManager } from "../object/objectManager/CanvasObjectFrameManager";
import { CanvasObjectManagerClass, CanvasObjectManagerClassType } from "../object/objectManager/canvasObjectManager";
import { FacilityFrame, FacilityFrameClass } from "./facilityFrame";

export interface FacilityManager extends CanvasObjectFrameManager<FacilityFrameClass, FacilityFrame> {
  animationFrame: AnimationFrameInfo;
  generationFrame: AnimationFrameInfo;
  movementFrame?: undefined;
}

export class FacilityManagerClass extends CanvasObjectManagerClass<FacilityManager, FacilityFrameClass, FacilityFrame> {}
