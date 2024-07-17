import { AnimationFrameInfo } from "../object/animationFrameInfo";
import { CanvasObjectManager } from "../object/canvasObjectManager";
import MonsterFrame from "./monsterFrame";

export interface MonsterManager extends CanvasObjectManager {
  monsters: MonsterFrame[];
  damageFrame: AnimationFrameInfo;
}
