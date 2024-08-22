export interface CanvasManager {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | null;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null> | null;
}
