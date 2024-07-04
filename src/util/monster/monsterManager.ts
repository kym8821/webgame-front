import { CanvasObjectManager } from '../canvasObjectManager';
import MonsterFrame from './monsterFrame';

export interface MonsterManager extends CanvasObjectManager {
  objects: MonsterFrame[];
}
