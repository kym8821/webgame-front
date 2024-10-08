import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { FacilityInfo } from "./facilityInfo";

export enum FacilityDirection {
  top = 0,
  right = 90,
  bottom = 180,
  left = 270,
}

export interface FacilityFrame extends ObjectFrame<FacilityInfo> {
  frameNumber: number;
  direction: FacilityDirection;
}

export class FacilityFrameClass implements ObjectFrameClassType<FacilityFrame, FacilityInfo> {
  static loadFrame = (facilityInfo: FacilityInfo, mapPointX: number, mapPointY: number) => {
    const facilityFrame: FacilityFrame = {
      info: facilityInfo,
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      frameNumber: 0,
      images: [],
      direction: FacilityDirection.bottom,
    };
    for (let i = 0; i < facilityInfo.images.length; i++) {
      const image = facilityInfo.images[i];
      facilityFrame.images.push(image);
    }
    return new FacilityFrameClass(facilityFrame);
  };
  constructor(facilityFrame: FacilityFrame) {
    this.frame = facilityFrame;
  }
  frame: FacilityFrame;
  getPosition = (blockSize: number) => {
    const pos: Position = {
      posX: this.frame.mapPointX,
      posY: this.frame.mapPointY,
      boundX: this.frame.mapPointX + blockSize,
      boundY: this.frame.mapPointY + blockSize,
      width: this.frame.info.width * blockSize,
      height: this.frame.info.height * blockSize,
    };
    return pos;
  };
}
