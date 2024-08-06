import { useEffect, useRef } from 'react';
import style from '../../assets/css/gameScreen.module.css';
import mapDrawer from '../../util/map/mapCoordConverter';
import { convertNumberMapToMapFrameMap, MapManager } from '../../util/map/mapManager';
import { getCurrentBlockSize } from '../../util/windowSize';
import MapElementHandler from '../../util/map/mapElementHandler';
import mapElementInfo, { MapElementInfo } from '../../util/map/mapElementInfo';
import { LauncherInfo } from '../../util/launcher/launcherInfo';
import { SelectedComponent } from '../../pages/gamePage/GamePage';
import { handleCanvasClickEvent } from '../../util/canvasClickEvent';
import { CanvasManager } from '../../util/object/CanvasManager';
import facilityInfo from '../../util/facility/facilityInfo';

// const map = [
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// ];

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
  mapManager: React.MutableRefObject<MapManager>;
}

interface MapScreenHandler {
  defaultMapElementHandler: MapElementHandler | undefined;
}

const mapScreenHandler: MapScreenHandler = {
  defaultMapElementHandler: undefined,
};

const MapScreen = ({ page, selectedComponent, mapManager }: MapScreenProps) => {
  const [canvasRef, contextRef] = [mapManager.current.canvasRef, mapManager.current.contextRef];
  const lastUpdatedBlockSize = useRef<number>(0);
  const mapElementHandler = new MapElementHandler(mapManager.current);

  useEffect(() => {
    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
      const currentBlockSize = getCurrentBlockSize(canvas.width, map);
      if (currentBlockSize) mapManager.current.blockSize = currentBlockSize;
    }

    if (!canvasRef || !canvasRef.current) return;
    mapManager.current.map = convertNumberMapToMapFrameMap(map);
    mapManager.current.numberMap = map;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      contextRef.current = context;
      // mapScreenHandler.defaultMapElementHandler = new MapElementHandler(canvas, mapManager.current, context);
      setCanvasSize();
      mapElementHandler.draw(context);
    }
    return () => {};
  }, [mapManager]);

  return (
    <div className={`${style.gameScreen} ${style.mapScreen}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export { mapScreenHandler };
export default MapScreen;
