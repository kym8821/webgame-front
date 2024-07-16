import launcherInfo from "../launcher/launcherInfo";
import { MapManager } from "../map/mapManager";
import { FacilityFrame } from "./facilityFrame";
import { FacilityInfo } from "./facilityInfo";
import { FacilityManager } from "./facilityManager";

export default class FacilityElementHandler {
  mapManager: MapManager;

  constructor(mapManager: MapManager) {
    this.mapManager = mapManager;
  }

  loadFrames = (facilityInfo: FacilityInfo, mapPosX: number, mapPosY: number) => {
    const facilityFrame: FacilityFrame = {
      info: facilityInfo,
      mapPosX: mapPosX,
      mapPosY: mapPosY,
      frame: [],
    };
    const image = new Image();
    image.src = facilityInfo.src;
    facilityFrame.frame.push(image);
    return facilityFrame;
  };

  draw = (facilityManager: FacilityManager) => {
    const [canvas, context, facilities] = [
      facilityManager.canvasRef.current,
      facilityManager.contextRef.current,
      facilityManager.facilities,
    ];
    const blockSize = this.mapManager.blockSize;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    facilities.forEach((facility) => {
      const { mapPosX, mapPosY, info } = facility;
      const image = new Image();
      image.src = info.src;
      image.onload = () => {
        context.save();
        context.translate(mapPosX, mapPosY);
        context.drawImage(
          image,
          mapPosX * blockSize,
          mapPosY * blockSize - blockSize * 0.4,
          blockSize * info.width,
          blockSize * info.height
        );
        context.restore();
      };
    });
  };

  getCurrentOutput = (facilities: FacilityFrame[]) => {
    facilities.forEach((fac) => {
      const { mapPosX, mapPosY, info } = fac;
    });
  };
}
