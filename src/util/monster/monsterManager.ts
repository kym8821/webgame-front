import { CanvasObjectManager } from "../object/canvasObjectManager";
import MonsterFrame from "./monsterFrame";

export interface MonsterManager extends CanvasObjectManager {
  objects: MonsterFrame[];
}
