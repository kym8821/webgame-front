import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { MonsterInfo } from "./monsterInfo";
import mapCoordConverter from "../map/mapCoordConverter";
import { Position } from "../Position";
import monsterImages from "../../assets/images/monster/monsterImages";
import { MapManager } from "../map/mapManager";

export interface MonsterFrame extends ObjectFrame {
  id: number;
  info: MonsterInfo;
  frameNumber: number;
  move: number;
  lifePoint: number;
}

export class MonsterFrameClass implements ObjectFrameClassType<MonsterFrame> {
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
      const frame = new Image();
      const src = `${monsterInfo.name}${i}`;
      if (src in monsterImages) {
        frame.src = monsterImages[src];
        monster.images.push(frame);
      } else {
        console.error(`Frame ${src} not found in monsterImages object.`);
      }
    }
    if (monster.images.length > 0) return new MonsterFrameClass(monster);
    return undefined;
  };
  constructor(monsterFrame: MonsterFrame) {
    this.frame = monsterFrame;
  }
  frame: MonsterFrame;
  getPosition = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
    const position: Position = mapCoordConverter.mapToCanvasCoord(this.frame.mapPointY, this.frame.mapPointY, blockSize);
    const width = this.frame.info.width * (canvasWidth * 0.0005);
    const height = this.frame.info.height * (canvasWidth * 0.0005);
    const posX = position.posX + this.frame.move * (canvasWidth * 0.02);
    let posY = position.posY + (blockSize / 2 - height);
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
  intersectWithCore = (canvasWidth: number, canvasHeight: number, mapManager: MapManager) => {
    const { posX, posY } = this.getPosition(canvasWidth, canvasHeight, mapManager.blockSize);
    const map = mapManager.map;
    if (posX < 0 || posY < 0 || posX >= map.length || posY >= map[0].length) return true;
    return false;
  };
}

export default MonsterFrame;
