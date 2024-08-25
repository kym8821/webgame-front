import { useEffect, useRef } from 'react';
import style from '../../assets/css/gameScreen.module.css';
import { MapManagerClass } from '../../util/map/mapManager';
import { getCurrentBlockSize } from '../../util/windowSize';
import MapElementHandler from '../../util/map/mapElementHandler';
import { TotalScreenManager } from '../../util/totalScreenManager';
import mapImages from '../../assets/images/map/mapImages';
import mapElementInfo from '../../util/map/mapElementInfo';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { SelectedComponent } from '../../util/SelectedComponent';

// const map = [
//   [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
//   [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// ];

const map = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];

interface MapScreenProps {
  page: number;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
}

interface MapScreenHandler {
  defaultMapElementHandler: MapElementHandler | undefined;
}

const mapScreenHandler: MapScreenHandler = {
  defaultMapElementHandler: undefined,
};

const MapScreen = ({ totalScreenManager, totalElementHandler }: MapScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  let mapElementHandler: MapElementHandler | null = null;

  useEffect(() => {
    if (!totalScreenManager || !totalElementHandler) return;
    function setCanvasAndContext() {
      if (!totalScreenManager) return;
      // set canvas
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
      // set context
      const context = canvasRef.current.getContext('2d');
      if (!context) return;
      contextRef.current = context;
      totalScreenManager.mapManager.manager.canvasRef = canvasRef;
      totalScreenManager.mapManager.manager.contextRef = contextRef;
    }
    setCanvasAndContext();
    if (!canvasRef.current || !contextRef.current) {
      console.log(canvasRef, contextRef);
      return;
    }
    // set mapManager
    const mapManager = totalScreenManager.mapManager.manager;
    const currentBlockSize = getCurrentBlockSize(canvasRef.current.width, canvasRef.current.height, map);
    if (currentBlockSize) mapManager.blockSize = currentBlockSize;
    // set object manager
    totalElementHandler.mapHandler.reDraw();
    return () => {};
  }, [totalScreenManager, canvasRef, contextRef, mapElementInfo]);

  return (
    <div className={`${style.gameScreen} ${style.mapScreen}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export { mapScreenHandler };
export default MapScreen;
