import { AnimationFrameInfo } from '../animationFrameInfo';
import { CanvasObjectFrameManager } from '../object/objectManager/CanvasObjectFrameManager';
import { CanvasObjectManagerClass, CanvasObjectManagerClassType } from '../object/objectManager/canvasObjectManager';
import { FacilityFrame, FacilityFrameClass } from './facilityFrame';
import { FacilityInfo } from './facilityInfo';

export interface FacilityManager extends CanvasObjectFrameManager<FacilityFrameClass, FacilityFrame, FacilityInfo> {
  animationFrame: AnimationFrameInfo;
  generationFrame: AnimationFrameInfo;
  movementFrame?: undefined;
}

export class FacilityManagerClass extends CanvasObjectManagerClass<
  FacilityManager,
  FacilityFrameClass,
  FacilityFrame,
  FacilityInfo
> {}
