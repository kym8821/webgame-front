import { ObjectFrame } from '../object/objectFrame';
import { FacilityInfo } from './facilityInfo';

export interface FacilityFrame extends ObjectFrame {
  info: FacilityInfo;
  frameNumber: number;
  mapPosX: number;
  mapPosY: number;
}
