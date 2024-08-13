import monsterImages from "../../assets/images/monster/monsterImages";
import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { Position } from "../Position";
import MonsterFrame, { MonsterFrameClass } from "./monsterFrame";
import { MonsterInfo } from "./monsterInfo";
import { MonsterManager } from "./monsterManager";

export default class MonsterElementHandler implements ObjectElementHandler<MonsterManager> {
  constructor(manager: MonsterManager, mapManager: MapManager) {
    this.manager = manager;
    this.mapManager = mapManager;
    this.monsterId = manager.monsters[manager.monsters.length - 1].frame.id + 1;
  }
  manager: MonsterManager;
  mapManager: MapManager;
  monsterId: number;

  private drawAll = (callback: (monsterFrame: MonsterFrame, idx: number, mpx: number, mpy: number) => void) => {
    const [canvas, context] = [this.manager.canvasRef.current, this.manager.contextRef.current];
    const monsters = this.manager.monsters;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      const [info, frame] = [monster.frame.info, monster.frame];
      const frameNumber = frame.frameNumber;
      const position = monster.getPosition(canvas.width, canvas.height, this.mapManager.blockSize);
      const [mpx, mpy] = mapCoordConverter.canvasToMapCoord(position.posX, position.posY, this.mapManager.blockSize);
      context.save();
      context.translate(position.posX + position.width / 2, position.posY + position.height / 2);
      context.drawImage(
        frame.images[frameNumber],
        Math.round(-position.width / 2),
        Math.round(-position.height / 2),
        Math.round(position.width),
        Math.round(position.height)
      );
      context.restore();
      /** call callback on every loop */
      callback(monster.frame, i, mpx, mpy);
    }
  };

  drawNext = () => {
    const callback = (monsterFrame: MonsterFrame, idx: number, mpx: number, mpy: number) => {
      if (mapCoordConverter.isOutOfRange(mpx, mpy, this.mapManager)) {
        return;
      } else {
        this.manager.monsters[idx].frame.move += monsterFrame.info.speed;
      }
    };
    this.drawAll(callback);
  };

  reDraw = () => {
    const callback = () => {};
    this.drawAll(callback);
  };

  animate = () => {
    const [canvas, context] = [this.manager.canvasRef.current, this.manager.contextRef.current];
    const monsters = this.manager.monsters;
    if (!canvas || !context) return;
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      const info = monster.frame.info;
      const frameNumber = monster.frame.frameNumber;
      const frameSize = info.frameSize;
      monsters[i].frame.frameNumber = (frameNumber + 1) % frameSize;
    }
  };
}
