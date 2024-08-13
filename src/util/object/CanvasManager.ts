import { AnimationFrameInfo } from "./animationFrameInfo";

export interface CanvasManager {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}
