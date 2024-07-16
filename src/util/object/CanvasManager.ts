import { AnimationFrameInfo } from "./animationFrameInfo";

export interface CanvasManager {
  animationFrame: AnimationFrameInfo;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}
