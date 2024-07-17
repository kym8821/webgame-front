import monsterImages from "../../assets/images/monster/monsterImages";
import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import { Position } from "../Position";
import defaultWindowSize from "../windowSize";
import MonsterFrame from "./monsterFrame";
import monsterInfo, { MonsterInfo } from "./monsterInfo";

export default class MonsterElementHandler {
  mapManager: MapManager;
  monsterId: number;

  constructor(mapManager: MapManager) {
    this.mapManager = mapManager;
    this.monsterId = 0;
  }

  loadFrames = (monsterInfo: MonsterInfo, startMapX: number, startMapY: number) => {
    const monster: MonsterFrame = {
      info: {
        id: this.monsterId++,
        type: monsterInfo.name,
        startMapX: startMapX,
        startMapY: startMapY,
        move: 0,
        frameSize: monsterInfo.frameSize,
        frameNumber: 0,
        width: monsterInfo.width,
        height: monsterInfo.height,
        lifePoint: monsterInfo.lifePoint,
        speed: monsterInfo.speed,
      },
      frame: [],
    };
    for (let i = 0; i < monsterInfo.frameSize; i++) {
      const frame = new Image();
      const src = `${monsterInfo.name}${i}`;
      if (src in monsterImages) {
        frame.src = monsterImages[src];
        monster.frame.push(frame);
      } else {
        console.error(`Frame ${src} not found in monsterImages object.`);
      }
    }
    if (monster.frame.length > 0) return monster;
    return undefined;
  };

  getNextObject = () => {
    const monsters = Object.values(monsterInfo);
    let totalSpawnRate = 0;
    monsters.forEach((monster) => {
      totalSpawnRate += monster.spawnRate;
    });
    let currentRate = 0,
      expectRate = Math.round(Math.random() * totalSpawnRate);
    for (let i = 0; i < monsters.length; i++) {
      if (expectRate <= currentRate + monsters[i].spawnRate) return monsters[i];
      currentRate += monsters[i].spawnRate;
    }
    return undefined;
  };

  getPosition = (canvas: HTMLCanvasElement, monster: MonsterFrame) => {
    const ratio = (window.innerWidth * 0.8) / defaultWindowSize.width;
    const info = monster.info;
    const position: Position = mapCoordConverter.mapToCanvasCoord(info.startMapX, info.startMapY, this.mapManager.blockSize);
    const width = info.width * (canvas.width * 0.0005);
    const height = info.height * (canvas.width * 0.0005);
    const posX = position.posX + info.move * (canvas.width * 0.02);
    let posY = position.posY + (this.mapManager.blockSize / 2 - height);
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

  animate = (canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null, monsters: MonsterFrame[], toChange: boolean) => {
    if (!canvas || !context) return;
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      const [info, frame] = [monster.info, monster.frame];
      const frameNumber = info.frameNumber;
      const frameSize = info.frameSize;
      if (toChange) {
        monsters[i].info.frameNumber = (frameNumber + 1) % frameSize;
      }
    }
  };

  move = (canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null, monsters: MonsterFrame[], toChange: boolean) => {
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      const [info, frame] = [monster.info, monster.frame];
      const frameNumber = info.frameNumber;
      const position = this.getPosition(canvas, monster);
      const [mpx, mpy] = mapCoordConverter.canvasToMapCoord(position.posX, position.posY, this.mapManager.blockSize);
      context.save();
      context.translate(position.posX + position.width / 2, position.posY + position.height / 2);
      context.drawImage(frame[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();
      if (this.isOutOfRange(mpx, mpy)) {
        continue;
      } else if (toChange) {
        monsters[i].info.move += info.speed * 0.1;
      }
    }
  };

  isOutOfRange = (mapPosX: number, mapPosY: number) => {
    if (mapPosX < 0 || mapPosX >= this.mapManager.map[0].length - 2 || mapPosY < 0 || mapPosY >= this.mapManager.map.length) {
      return true;
    }
    return false;
  };
}
