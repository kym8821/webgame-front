import { AnimationFrameInfo } from './animationFrameInfo';

export interface CanvasObjectManager {
  objects: any[];
  generationFrame: AnimationFrameInfo | undefined;
  animationFrame: AnimationFrameInfo;
}
