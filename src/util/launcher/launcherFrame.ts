import { ObjectFrame } from '../objectFrame';

export interface LauncherFrame extends ObjectFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
    radian: number;
  };
}
