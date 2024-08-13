import { CanvasObjectFrameManager } from "../object/CanvasObjectFrameManager";
import { CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { FacilityFrame, FacilityFrameClass } from "./facilityFrame";

export interface FacilityManager extends CanvasObjectFrameManager<FacilityFrameClass, FacilityFrame> {
  animationFrame: undefined;
  movementFrame: undefined;
}

export class FacilityManagerClass implements CanvasObjectManagerClassType<FacilityManager> {
  constructor(facilityManager: FacilityManager) {
    this.manager = facilityManager;
  }
  manager: FacilityManager;
  add: Function = (facility: FacilityFrameClass) => {
    this.manager.objects.push(facility);
  };
  delete: Function = (callback: (facility: FacilityFrameClass) => boolean) => {
    for (let i = 0; i < this.manager.objects.length; i++) {
      if (callback(this.manager.objects[i])) {
        this.manager.objects.splice(i, 1);
        i -= 1;
      }
    }
  };
}
