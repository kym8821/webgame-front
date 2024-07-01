import { NumberLiteralType } from "typescript";

interface MonsterFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
  };
  frame: HTMLImageElement[];
}

interface Info {
  type: string;
  frameSize: number;
  frameNumber: number;
  posX: number;
  posY: number;
}

export default MonsterFrame;
