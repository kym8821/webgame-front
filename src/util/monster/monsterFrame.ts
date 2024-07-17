import { NumberLiteralType } from "typescript";
import { ObjectFrame } from "../object/objectFrame";
import { MonsterInfo } from "./monsterInfo";

interface MonsterFrame extends ObjectFrame {
  id: number;
  info: MonsterInfo;
  frameNumber: number;
  startMapX: number;
  startMapY: number;
  move: number;
  lifePoint: number;
}

export default MonsterFrame;
