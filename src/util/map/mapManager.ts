import { CanvasObjectManager, CanvasObjectManagerClass } from '../object/objectManager/canvasObjectManager';
import { Coordinate } from '../Position';
import mapElementInfo, { getMapInfoById, MapElementInfo } from './mapElementInfo';
import { MapFrame, MapFrameClass } from './mapFrame';

interface TransformInfo {
  scale: number;
  panning: boolean;
  viewPos: Coordinate;
  startPos: Coordinate;
  minScale: number;
  maxScale: number;
}

export interface MapManager extends CanvasObjectManager<MapFrameClass, MapFrame, MapElementInfo> {
  numberMap: number[][];
  map: MapFrameClass[][];
  blockSize: number;
  transformInfo: TransformInfo;
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

  static loadNumberMap = (width: number, height: number) => {
    const map: number[][] = new Array(height);
    // set map init
    for (let i = 0; i < height; i++) {
      map[i] = new Array(width);
      for (let j = 0; j < width; j++) map[i][j] = mapElementInfo.tile.id;
    }
    // set core
    for (let i = height / 2 - 1; i <= height / 2; i++) {
      for (let j = width / 2 - 1; j <= width / 2; j++) {
        map[i][j] = mapElementInfo.core.id;
      }
    }
    return map;
  };
}
