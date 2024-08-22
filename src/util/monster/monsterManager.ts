import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectFrameManager } from "../object/objectManager/CanvasObjectFrameManager";
import { CanvasObjectManagerClass, CanvasObjectManagerClassType } from "../object/objectManager/canvasObjectManager";
import MonsterFrame, { MonsterFrameClass } from "./monsterFrame";
import { MonsterInfo } from "./monsterInfo";

export interface MonsterManager extends CanvasObjectFrameManager<MonsterFrameClass, MonsterFrame, MonsterInfo> {
  animationFrame: AnimationFrameInfo;
  generationFrame: AnimationFrameInfo;
  movementFrame: AnimationFrameInfo;
  damageFrame: AnimationFrameInfo;
}

export class MonsterManagerClass extends CanvasObjectManagerClass<MonsterManager, MonsterFrameClass, MonsterFrame, MonsterInfo> {}
