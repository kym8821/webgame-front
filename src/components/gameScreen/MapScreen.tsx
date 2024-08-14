import { useEffect } from "react";
import style from "../../assets/css/gameScreen.module.css";
import { MapManagerClass } from "../../util/map/mapManager";
import { getCurrentBlockSize } from "../../util/windowSize";
import MapElementHandler from "../../util/map/mapElementHandler";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { TotalScreenManager } from "../../util/totalScreenManager";

const map = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

interface MapScreenProps {
  page: number;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  totalScreenManager: TotalScreenManager | undefined;
}

interface MapScreenHandler {
  defaultMapElementHandler: MapElementHandler | undefined;
}

const mapScreenHandler: MapScreenHandler = {
  defaultMapElementHandler: undefined,
};

const MapScreen = ({ page, selectedComponent, totalScreenManager }: MapScreenProps) => {
  let mapElementHandler: MapElementHandler | null = null;

  useEffect(() => {
    if (!totalScreenManager) return;
    const { canvasRef, contextRef } = totalScreenManager.facilityManager.manager;
    if (!canvasRef.current) return;
    // set mapManager
    const mapManager = totalScreenManager.mapManager.manager;
    const currentBlockSize = getCurrentBlockSize(canvasRef.current.width, map);
    if (currentBlockSize) mapManager.blockSize = currentBlockSize;
    mapManager.map = MapManagerClass.convertNumberMapToMapFrameMap(map);
    mapManager.numberMap = map;
    // set canvas
    canvasRef.current.width = canvasRef.current.scrollWidth;
    canvasRef.current.height = canvasRef.current.width / 2;
    // set context
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    contextRef.current = context;
    // set object manager
    mapElementHandler = new MapElementHandler(mapManager);
    mapElementHandler.reDraw();
    return () => {};
  }, [totalScreenManager]);

  return (
    <div className={`${style.gameScreen} ${style.mapScreen}`}>
      {totalScreenManager && <canvas ref={totalScreenManager.mapManager.manager.canvasRef} />}
    </div>
  );
};

export { mapScreenHandler };
export default MapScreen;
