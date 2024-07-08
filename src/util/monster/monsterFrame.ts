import { NumberLiteralType } from "typescript";
import { ObjectFrame } from "../objectFrame";

interface MonsterFrame extends ObjectFrame {
  info: {
    id: number;
    type: string;
    frameSize: number;
    frameNumber: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
    lifePoint: number;
  };
}

export default MonsterFrame;
