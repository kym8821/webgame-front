import { ObjectFrame, ObjectFrameClassType } from '../object/objectFrame';
import { MonsterInfo } from './monsterInfo';
import mapCoordConverter from '../map/mapCoordConverter';
import { Position } from '../Position';
import { MapManager } from '../map/mapManager';

export interface MonsterFrame extends ObjectFrame<MonsterInfo> {
  id: number;
  info: MonsterInfo;
  frameNumber: number;
  move: number;
  lifePoint: number;
}

export class MonsterFrameClass implements ObjectFrameClassType<MonsterFrame, MonsterInfo> {
  static loadFrame = (monsterInfo: MonsterInfo, mapPointX: number, mapPointY: number, id: number) => {
    const monster: MonsterFrame = {
      id: id,
      info: monsterInfo,
      frameNumber: 0,
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      move: 0,
      lifePoint: monsterInfo.lifePoint,
      images: [],
    };
    for (let i = 0; i < monsterInfo.frameSize; i++) {
      const frame = monsterInfo.images[i];
      monster.images.push(frame);
    }
    if (monster.images.length > 0) return new MonsterFrameClass(monster);
    return undefined;
  };
  constructor(monsterFrame: MonsterFrame) {
    this.frame = monsterFrame;
  }
  frame: MonsterFrame;
  getPosition = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
    const position: Position = mapCoordConverter.mapToCanvasCoord(
      this.frame.mapPointY,
      this.frame.mapPointY,
      blockSize
    );
    const width = this.frame.info.width * blockSize;
    const height = this.frame.info.height * blockSize;
    const posX = position.posX + this.frame.move * blockSize * 0.1;
    const posY = position.posY - blockSize * 0.25;
    const boundX = posX + width;
    const boundY = posY + height;
    return {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      boundX: boundX,
      boundY: boundY,
    } as Position;
  };
  intersectWithCore = (canvasWidth: number, canvasHeight: number, mapManager: MapManager, blockSize: number) => {
    const { posX, posY } = this.getPosition(canvasWidth, canvasHeight, mapManager.blockSize);
    const [mapPosX, mapPosY] = mapCoordConverter.canvasToMapCoord(posX, posY, mapManager);
    const map = mapManager.map;
    if (mapPosX < 0 || mapPosY < 0 || mapPosX >= map.length || mapPosY >= map[0].length) return true;
    return false;
  };
}

export default MonsterFrame;
