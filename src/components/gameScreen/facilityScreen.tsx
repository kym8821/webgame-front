import { useEffect, useRef } from "react";
import style from "../../assets/css/gameScreen.module.css";
import mapDrawer from "../../util/map/mapCoordConverter";
import { convertNumberMapToMapFrameMap, MapManager } from "../../util/map/mapManager";
import { getCurrentBlockSize } from "../../util/windowSize";
import MapElementHandler from "../../util/map/mapElementHandler";
import mapElementInfo, { MapElementInfo } from "../../util/map/mapElementInfo";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import { CanvasManager } from "../../util/object/CanvasManager";
import facilityInfo from "../../util/facility/facilityInfo";
import { FacilityManager } from "../../util/facility/facilityManager";
import FacilityElementHandler from "../../util/facility/facilityElementHandler";
import { AnimationFrameInfo } from "../../util/object/animationFrameInfo";
import { Resource } from "../../util/resource";

interface FacilityScreenProps {
  page: number;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  mapMananger: React.MutableRefObject<MapManager>;
  facilityManager: React.MutableRefObject<FacilityManager>;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const FacilityScreen = ({ facilityManager, mapMananger, resource, setResource }: FacilityScreenProps) => {
  const [canvasRef, contextRef] = [facilityManager.current.canvasRef, facilityManager.current.contextRef];
  const facilityElementHandler = new FacilityElementHandler(mapMananger.current);

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
    function callback() {
      setResource((prev) => ({
        ...prev,
        energy: prev.energy + resource.energyOutput,
        evolveFactor: prev.evolveFactor + resource.evolveFactorOutput,
      }));
    }
    animate(facilityManager.current.generationFrame, callback);
  }

  useEffect(() => {
    function setValues() {
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
    }
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (facilityManager.current.facilities.length === 0) {
      const coreFrame = facilityElementHandler.loadFrames(facilityInfo.core, 14, 1);
      facilityManager.current.facilities.push(coreFrame);
    }
    if (context) {
      contextRef.current = context;
    }
    setValues();
    facilityElementHandler.draw(facilityManager.current);
  }, []);

  useEffect(() => {
    generateResource();
    return () => {
      if (facilityManager.current.generationFrame.animationFrame)
        cancelAnimationFrame(facilityManager.current.generationFrame.animationFrame);
    };
  }, [resource]);

  return (
    <div className={`${style.gameScreen}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default FacilityScreen;
