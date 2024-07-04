import { ObjectFrame } from '../objectFrame';

interface ProjectileFrame extends ObjectFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
    damage: number;
  };
}

export default ProjectileFrame;
