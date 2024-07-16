import { CanvasManager } from "../object/CanvasManager";
import { CanvasObjectManager } from "../object/canvasObjectManager";
import { FacilityFrame } from "./facilityFrame";

export interface FacilityManager extends CanvasManager {
  energy: number;
  energyOutput: number;
  evolveFactor: number;
  evolveFactorOutput: number;
  facilities: FacilityFrame[];
}
