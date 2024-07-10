export interface MapCanvasManager {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}
