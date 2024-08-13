import { AnimationFrameInfo } from "../object/animationFrameInfo";
import { CanvasObjectManager, CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import MonsterFrame, { MonsterFrameClass } from "./monsterFrame";

export interface MonsterManager extends CanvasObjectManager {
  monsters: MonsterFrameClass[];
  damageFrame: AnimationFrameInfo;
}

export class MonsterManagerClass implements CanvasObjectManagerClassType<MonsterManager> {
  constructor(monsterManager: MonsterManager) {
    this.manager = monsterManager;
  }
  manager: MonsterManager;
  delete = (callback: (frame: MonsterFrameClass) => boolean) => {
    const monsters = this.manager.monsters;
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      if (callback(monster)) {
        monsters.splice(i, 1);
        i -= 1;
      }
    }
  };
  add = (monster: MonsterFrameClass) => {
    const monsters = this.manager.monsters;
    monsters.push(monster);
  };
}
