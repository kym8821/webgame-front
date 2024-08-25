import { useEffect, useRef } from 'react';
import style from '../../assets/css/gameScreen.module.css';
import FacilityElementHandler from '../../util/facility/facilityElementHandler';
import { AnimationFrameInfo } from '../../util/animationFrameInfo';
import { Resource } from '../../util/resource';
import { TotalScreenManager } from '../../util/totalScreenManager';
import facilityInfo from '../../util/facility/facilityInfo';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { SelectedComponent } from '../../util/SelectedComponent';

interface FacilityScreenProps {
  page: number;
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
  selectedComponent: SelectedComponent | null;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const FacilityScreen = ({ totalScreenManager, totalElementHandler, resource, setResource }: FacilityScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  let facilityElementHandler: FacilityElementHandler | null = null;

  function animate(animation: AnimationFrameInfo, callback: Function) {
    const step = (timeStamp: number) => {
      const { interval, lastFrameTime } = animation;
      if (timeStamp - lastFrameTime > interval) {
        animation.lastFrameTime = timeStamp;
        callback();
      }
      if (animation) animation.animationFrame = requestAnimationFrame(step);
    };
    animation.animationFrame = requestAnimationFrame(step);
  }

  function generateResource() {
    if (!totalScreenManager) return;
    const facilityManager = totalScreenManager.facilityManager;
    function callback() {
      setResource((prev) => ({
        ...prev,
        energy: prev.energy + resource.energyOutput,
        evolveFactor: prev.evolveFactor + resource.evolveFactorOutput,
      }));
    }
    animate(facilityManager.manager.generationFrame, callback);
  }

  function setAnimationTimer() {
    if (!totalScreenManager) return;
    const facilityManager = totalScreenManager.facilityManager;
    function callback() {
      if (!facilityElementHandler) return;
      facilityElementHandler.animate();
      facilityElementHandler.drawNext();
    }
    animate(facilityManager.manager.animationFrame, callback);
  }

  useEffect(() => {
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
      totalScreenManager.facilityManager.manager.canvasRef = canvasRef;
      totalScreenManager.facilityManager.manager.contextRef = contextRef;
    }
    setCanvasAndContext();
    // set facilityElementHandler
    if (!totalScreenManager || !totalElementHandler) return;
    totalElementHandler.facilityHandler.reDraw();
  }, [totalScreenManager, totalElementHandler, canvasRef, contextRef, facilityInfo]);

  useEffect(() => {
    generateResource();
    setAnimationTimer();
    if (!totalScreenManager) return;
    const { animationFrame, generationFrame } = totalScreenManager.facilityManager.manager;
    return () => {
      if (generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, [resource]);

  return (
    <div className={`${style.gameScreen}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default FacilityScreen;
