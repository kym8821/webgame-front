import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { MapElementInfo } from "./mapElementInfo";

export interface MapFrame extends ObjectFrame {
  activate: boolean;
  empty: boolean;
}

export class MapFrameClass implements ObjectFrameClassType<MapFrame> {
  static loadFrame = (mapInfo: MapElementInfo, mapPointX: number, mapPointY: number) => {
    const mapFrame: MapFrame = {
      info: mapInfo,
      images: [],
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      activate: false,
      empty: false,
    };
    const image = new Image();
    image.src = mapInfo.src;
    image.onload = () => {
      mapFrame.images.push(image);
    };
    return new MapFrameClass(mapFrame);
  };
  constructor(mapFrame: MapFrame) {
    this.frame = mapFrame;
  }
  frame: MapFrame;
  getPosition: (...args: any) => Position = () => {
    return {} as Position;
  };
}
