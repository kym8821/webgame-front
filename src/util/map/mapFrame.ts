import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { MapElementInfo } from "./mapElementInfo";

export interface MapFrame extends ObjectFrame<MapElementInfo> {
  activate: boolean;
  empty: boolean;
}

export class MapFrameClass implements ObjectFrameClassType<MapFrame, MapElementInfo> {
  static loadFrame = (mapInfo: MapElementInfo, mapPointX: number, mapPointY: number) => {
    const mapFrame: MapFrame = {
      info: mapInfo,
      images: [],
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      frameNumber: 0,
      activate: false,
      empty: false,
    };
    for (let i = 0; i < mapInfo.images.length; i++) {
      const image = mapInfo.images[i];
      mapFrame.images.push(image);
    }
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
