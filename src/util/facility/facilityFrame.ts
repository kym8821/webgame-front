import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { FacilityInfo } from "./facilityInfo";

export interface FacilityFrame extends ObjectFrame {
  info: FacilityInfo;
  frameNumber: number;
  mapPosX: number;
  mapPosY: number;
}

export class FacilityFrameClass implements ObjectFrameClassType<FacilityFrame> {
  loadFrame = (facilityInfo: FacilityInfo, startMapX: number, startMapY: number) => {
    const facilityFrame: FacilityFrame = {
      info: facilityInfo,
      mapPosX: startMapX,
      mapPosY: startMapY,
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
    return facilityFrame;
  };
  constructor(facilityFrame: FacilityFrame) {
    this.frame = facilityFrame;
  }
  frame: FacilityFrame;
  getPosition: (...args: any) => Position = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
    const pos: Position = {
      posX: this.frame.mapPosX,
      posY: this.frame.mapPosY,
      boundX: this.frame.mapPosX + blockSize,
      boundY: this.frame.mapPosY + blockSize,
      width: this.frame.info.width * blockSize,
      height: this.frame.info.height * blockSize,
    };
    return pos;
  };
}
