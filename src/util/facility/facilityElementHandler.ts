import launcherInfo from "../launcher/launcherInfo";
import mapCoordConverter from "../map/mapCoordConverter";
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
      const position = mapCoordConverter.mapToCanvasCoord(mapPosX, mapPosY, blockSize);
      const image = new Image();
      image.src = info.src;
      image.onload = () => {
        context.save();
        context.translate(position.posX, position.posY - blockSize * (info.height - 1));
        context.drawImage(image, 0, -blockSize * 0.25, blockSize * info.width, blockSize * info.height);
        context.restore();
      };
    });
  };

  getCurrentOutput = (facilities: FacilityFrame[]) => {
    let [energyOutput, evolveFactorOutput] = [0, 0];
    console.log(facilities);
    facilities.forEach((fac) => {
      const { mapPosX, mapPosY, info } = fac;
      console.log(this.mapManager.map[mapPosY][mapPosX]);
      if (this.mapManager.map[mapPosY][mapPosX].activate) {
        console.log(info);
        energyOutput += info.energyOutput;
        evolveFactorOutput += info.evolveFactorOutput;
      }
    });
    return [energyOutput, evolveFactorOutput];
  };
}
