import { NumberLiteralType } from 'typescript';
import { ObjectFrame } from '../objectFrame';

interface MonsterFrame extends ObjectFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
  };
}

export default MonsterFrame;
