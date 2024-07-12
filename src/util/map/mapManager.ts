import { CanvasManager } from "../object/CanvasManager";
import { getMapInfoById } from "./mapElementInfo";
import { MapFrame } from "./mapFrame";

export interface MapManager extends CanvasManager {
  map: MapFrame[][];
  mapObjects: MapFrame[];
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
      };
      mapFrameMap[i].push(mapFrame);
    }
  }
  return mapFrameMap;
}
