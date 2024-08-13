import { AnimationFrameInfo } from "../object/animationFrameInfo";
import { CanvasManager } from "../object/CanvasManager";
import { CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { FacilityFrameClass } from "./facilityFrame";

export interface FacilityManager extends CanvasManager {
  generationFrame: AnimationFrameInfo;
  facilities: FacilityFrameClass[];
}

export class FacilityManagerClass implements CanvasObjectManagerClassType<FacilityManager> {
  constructor(facilityManager: FacilityManager) {
    this.manager = facilityManager;
  }
  manager: FacilityManager;
  add: Function = (facility: FacilityFrameClass) => {
    this.manager.facilities.push(facility);
  };
  delete: Function = (callback: (facility: FacilityFrameClass) => boolean) => {
    for (let i = 0; i < this.manager.facilities.length; i++) {
      if (callback(this.manager.facilities[i])) {
        this.manager.facilities.splice(i, 1);
        i -= 1;
      }
    }
  };
}
