import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import resourceInfo, { ResourceInfo } from "./resourceInfo";

export interface ResourceFrame extends ObjectFrame<ResourceInfo> {
  flag: boolean;
  move: number;
  angle: number;
}

export default class ResourceFrameClass implements ObjectFrameClassType<ResourceFrame, ResourceInfo> {
  static loadFrame = (info: ResourceInfo, mapPointX: number, mapPointY: number) => {
    const frame: ResourceFrame = {
      info: info,
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      frameNumber: 0,
      images: [],
      flag: false,
      move: 0,
      angle: 0,
    };
    return frame;
  };

  constructor(resourceFrame: ResourceFrame) {
    this.frame = resourceFrame;
  }
  frame: ResourceFrame;
  getPosition = (blockSize: number) => {
    const width = this.frame.info.width * blockSize;
    const height = this.frame.info.height * blockSize;
    const dist = this.frame.move * (blockSize * 0.05);
    const [posX, posY] = [
      this.frame.mapPointX * blockSize + dist * Math.cos(this.frame.angle),
      this.frame.mapPointY * blockSize + dist * Math.sin(this.frame.angle),
    ];
    const position: Position = {
      posX: posX,
      posY: posY,
      boundX: posX + width,
      boundY: posY + height,
      width: width,
      height: height,
    };
    return position;
  };
}
