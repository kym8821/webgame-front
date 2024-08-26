import { useEffect, useRef } from 'react';
import style from '../../assets/css/gameScreen.module.css';
import { TotalScreenManager } from '../../util/totalScreenManager';
import mapElementInfo from '../../util/map/mapElementInfo';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { SelectedComponent } from '../../util/SelectedComponent';

interface MapScreenProps {
  page: number;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
}

const MapScreen = ({ totalScreenManager, totalElementHandler }: MapScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

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
    totalElementHandler.mapHandler.reDraw();
    return () => {};
  }, [totalScreenManager, totalElementHandler, canvasRef, contextRef, mapElementInfo]);

  return (
    <div className={`${style.gameScreen} ${style.mapScreen}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MapScreen;
