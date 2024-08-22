import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import ObjectElementHandler from "../object/ObjectElementHandler";
import MonsterFrame from "./monsterFrame";
import { MonsterManager } from "./monsterManager";

export default class MonsterElementHandler implements ObjectElementHandler<MonsterManager> {
  constructor(manager: MonsterManager, mapManager: MapManager) {
    this.manager = manager;
    this.mapManager = mapManager;
    if (manager.objects.length > 0) this.monsterId = manager.objects[manager.objects.length - 1].frame.id + 1;
    else this.monsterId = 1;
  }
  manager: MonsterManager;
  mapManager: MapManager;
  monsterId: number;

  private drawAll = (callback: (monsterFrame: MonsterFrame, idx: number, mpx: number, mpy: number) => void) => {
    if (!this.manager.canvasRef || !this.manager.contextRef || !this.manager.canvasRef.current || !this.manager.contextRef.current) return;
    const [canvas, context] = [this.manager.canvasRef.current, this.manager.contextRef.current];
    const monsters = this.manager.objects;
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
      context.drawImage(frame.images[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();
      callback(monster.frame, i, mpx, mpy);
    }
  };

  drawNext = () => {
    const callback = (monsterFrame: MonsterFrame, idx: number, mpx: number, mpy: number) => {
      if (mapCoordConverter.isOutOfRange(mpx, mpy, this.mapManager)) {
        return;
      } else {
        this.manager.objects[idx].frame.move += monsterFrame.info.speed;
      }
    };
    this.drawAll(callback);
  };

  reDraw = () => {
    const callback = () => {};
    this.drawAll(callback);
  };

  animate = () => {
    if (!this.manager.canvasRef || !this.manager.contextRef || !this.manager.canvasRef.current || !this.manager.contextRef.current) return;
    const [canvas, context] = [this.manager.canvasRef.current, this.manager.contextRef.current];
    const monsters = this.manager.objects;
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
