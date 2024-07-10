import { AnimationFrameInfo } from "./animationFrameInfo";

export interface CanvasObjectManager {
  objects: any[];
  generationFrame: AnimationFrameInfo | undefined;
  movementFrame: AnimationFrameInfo;
  animationFrame: AnimationFrameInfo;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}
