import { NumberLiteralType } from "typescript";
import { ObjectFrame } from "../object/objectFrame";

interface MonsterFrame extends ObjectFrame {
  info: {
    id: number;
    type: string;
    frameSize: number;
    frameNumber: number;
    startMapX: number;
    startMapY: number;
    move: number;
    width: number;
    height: number;
    lifePoint: number;
    speed: number;
  };
}

export default MonsterFrame;
