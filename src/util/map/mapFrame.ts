import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { MapElementInfo } from "./mapElementInfo";

export interface MapFrame extends ObjectFrame {
  mapPosX: number;
  mapPosY: number;
  activate: boolean;
  empty: boolean;
}

export class MapFrameClass implements ObjectFrameClassType<MapFrame> {
  static loadFrame = (mapInfo: MapElementInfo, startMapX: number, startMapY: number) => {
    const mapFrame: MapFrame = {
      info: mapInfo,
      images: [],
      mapPosX: startMapX,
      mapPosY: startMapY,
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
