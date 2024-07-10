import { useEffect, useRef } from "react";
import style from "../../assets/css/gameScreen.module.css";
import mapDrawer from "../../util/map/mapDrawer";
import { MapInfo } from "../../util/map/mapInfo";
import { getCurrentBlockSize } from "../../util/windowSize";
import MapElementHandler from "../../util/map/mapElementHandler";
import mapElementInfo, { MapElementInfo } from "../../util/map/mapElementInfo";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import { MapCanvasManager } from "../../util/map/mapCanvasManager";

// const map = [
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, -1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1],
//   [4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// ];

const map = [
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, -1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

interface MapScreenProps {
  page: number;
  selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  mapInfo: MapInfo;
  mapManager: React.MutableRefObject<MapCanvasManager>;
}

interface MapScreenHandler {
  defaultMapElementHandler: MapElementHandler | undefined;
}

const mapScreenHandler: MapScreenHandler = {
  defaultMapElementHandler: undefined,
};

const MapScreen = ({ page, selectedComponent, mapInfo, mapManager }: MapScreenProps) => {
  const [canvasRef, contextRef] = [mapManager.current.canvasRef, mapManager.current.contextRef];
  const lastUpdatedBlockSize = useRef<number>(0);

  useEffect(() => {
    function setValues() {
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
      const currentBlockSize = getCurrentBlockSize(canvas.width, map);
      if (currentBlockSize) mapInfo.blockSize = currentBlockSize;
      if (context) mapDrawer.draw(context, mapInfo.map, mapInfo.blockSize);
    }

    const windowResize = () => {
      const currentBlockSize = getCurrentBlockSize(canvas.scrollWidth, map);
      if (currentBlockSize) {
        mapInfo.blockSize = currentBlockSize;
      }
      if (currentBlockSize && currentBlockSize > lastUpdatedBlockSize.current * 2 && context) {
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.width / 2;
        mapDrawer.draw(context, mapInfo.map, mapInfo.blockSize);
        lastUpdatedBlockSize.current = mapInfo.blockSize;
      }
    };

    if (!canvasRef || !canvasRef.current) return;
    mapInfo.map = map;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      contextRef.current = context;
      mapScreenHandler.defaultMapElementHandler = new MapElementHandler(canvas, mapInfo, context);
    }
    window.addEventListener("resize", windowResize);
    setValues();
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <div className={`${style.gameScreen} ${style.mapScreen} ${style.clickEventScreen}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export { mapScreenHandler };
export default MapScreen;
