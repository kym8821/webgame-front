import { AnimationFrameInfo } from './animationFrameInfo';
import { ObjectFrame } from './objectFrame';

export interface CanvasObjectManager {
  objects: any[];
  generationFrame: AnimationFrameInfo;
  animationFrame: AnimationFrameInfo;
}
