import { AnimationFrameInfo } from "../object/animationFrameInfo";
import { CanvasManager } from "../object/CanvasManager";
import { CanvasObjectManager } from "../object/canvasObjectManager";
import { FacilityFrame } from "./facilityFrame";

export interface FacilityManager extends CanvasManager {
  generationFrame: AnimationFrameInfo;
  facilities: FacilityFrame[];
}
