import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { FacilityInfo } from "./facilityInfo";

export interface FacilityFrame extends ObjectFrame {
  info: FacilityInfo;
  frameNumber: number;
}

export class FacilityFrameClass implements ObjectFrameClassType<FacilityFrame> {
  static loadFrame = (facilityInfo: FacilityInfo, mapPointX: number, mapPointY: number) => {
    const facilityFrame: FacilityFrame = {
      info: facilityInfo,
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      frameNumber: 0,
      images: [],
    };
    const image = new Image();
    image.src = facilityInfo.src;
    facilityInfo.frames.forEach((src) => {
      const image = new Image();
      image.src = src;
      facilityFrame.images.push(image);
    });
    return new FacilityFrameClass(facilityFrame);
  };
  constructor(facilityFrame: FacilityFrame) {
    this.frame = facilityFrame;
  }
  frame: FacilityFrame;
  getPosition: (...args: any) => Position = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
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
