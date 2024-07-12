import { MapElementInfo } from "./mapElementInfo";

export interface MapFrame {
  mapPosX: number;
  mapPosY: number;
  info: MapElementInfo;
  activate: boolean;
}
