import { CanvasObjectManager, CanvasObjectManagerClass } from "../object/objectManager/canvasObjectManager";
import { getMapInfoById, MapElementInfo } from "./mapElementInfo";
import { MapFrame, MapFrameClass } from "./mapFrame";

export interface MapManager extends CanvasObjectManager<MapFrameClass, MapFrame, MapElementInfo> {
  numberMap: number[][];
  map: MapFrameClass[][];
  blockSize: number;
}

export function convertNumberMapToMapFrameMap(map: number[][]) {
  const mapFrameMap: MapFrame[][] = [];
  for (let i = 0; i < map.length; i++) {
    mapFrameMap.push([]);
    for (let j = 0; j < map[i].length; j++) {
      const mapInfo = getMapInfoById(map[i][j]);
      const mapFrame: MapFrame = {
        mapPointX: j,
        mapPointY: i,
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

export class MapManagerClass extends CanvasObjectManagerClass<MapManager, MapFrameClass, MapFrame, MapElementInfo> {
  static convertNumberMapToMapFrameMap = (map: number[][]) => {
    const mapFrameMap: MapFrameClass[][] = [];
    for (let i = 0; i < map.length; i++) {
      mapFrameMap.push([]);
      for (let j = 0; j < map[i].length; j++) {
        const mapInfo = getMapInfoById(map[i][j]);
        const mapFrame = MapFrameClass.loadFrame(mapInfo, j, i);
        mapFrameMap[i].push(mapFrame);
      }
    }
    return mapFrameMap;
  };
}
