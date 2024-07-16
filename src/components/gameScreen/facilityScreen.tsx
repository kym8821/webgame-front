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

interface FacilityScreenProps {
  page: number;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  mapMananger: React.MutableRefObject<MapManager>;
  facilityManager: React.MutableRefObject<FacilityManager>;
}

const FacilityScreen = ({ facilityManager, mapMananger }: FacilityScreenProps) => {
  const [canvasRef, contextRef] = [facilityManager.current.canvasRef, facilityManager.current.contextRef];
  const facilityElementHandler = new FacilityElementHandler(mapMananger.current);

  useEffect(() => {
    function setValues() {
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
    }
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const coreFrame = facilityElementHandler.loadFrames(facilityInfo.core, 14, 2);
    facilityManager.current.facilities.push(coreFrame);
    if (context) {
      contextRef.current = context;
    }
    setValues();
    facilityElementHandler.draw(facilityManager.current);
  }, []);

  return (
    <div className={`${style.gameScreen} ${style.mapScreen}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default FacilityScreen;
