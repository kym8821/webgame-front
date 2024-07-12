import { AnimationFrameInfo } from "./animationFrameInfo";

export interface CanvasObjectManager {
  generationFrame: AnimationFrameInfo | undefined;
  movementFrame: AnimationFrameInfo;
  animationFrame: AnimationFrameInfo;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}
