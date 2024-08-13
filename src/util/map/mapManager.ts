import { FacilityFrame } from "../facility/facilityFrame";
import { FacilityInfo } from "../facility/facilityInfo";
import { CanvasManager } from "../object/CanvasManager";
import { CanvasObjectManager, CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { getMapInfoById } from "./mapElementInfo";
import { MapFrame, MapFrameClass } from "./mapFrame";

export interface MapManager extends CanvasManager {
  numberMap: number[][];
  map: MapFrameClass[][];
  mapObjects: MapFrameClass[];
  blockSize: number;
}

export function convertNumberMapToMapFrameMap(map: number[][]) {
  const mapFrameMap: MapFrame[][] = [];
  for (let i = 0; i < map.length; i++) {
    mapFrameMap.push([]);
    for (let j = 0; j < map[i].length; j++) {
      const mapInfo = getMapInfoById(map[i][j]);
      const mapFrame: MapFrame = {
        mapPosX: j,
        mapPosY: i,
        info: mapInfo,
        activate: false,
        empty: true,
        images: [],
      };
      mapFrameMap[i].push(mapFrame);
    }
  }
  return mapFrameMap;
}

export class MapManagerClass implements CanvasObjectManagerClassType<MapManager> {
  constructor(mapManager: MapManager) {
    this.manager = mapManager;
  }
  manager: MapManager;
  add: Function = () => {};
  delete: Function = () => {};
}
