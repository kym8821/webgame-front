import { useEffect, useRef } from "react";
import "../../assets/css/canvasStyle.css";
import mapDrawer from "../../util/map/mapDrawer";

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const MapScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const blockSize = useRef<number>(window.innerWidth / 20);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      contextRef.current = context;
    }

    async function setValues() {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width * 0.5;
      blockSize.current = canvas.width / 20;
      mapDrawer.draw(context, map, blockSize.current);
    }

    console.log("draw map");
    const windowResize = async () => {
      console.log("resize : redraw map");
      await setValues();
    };
    window.addEventListener("resize", windowResize);
    setValues();
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <div className="mapScreen">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MapScreen;
