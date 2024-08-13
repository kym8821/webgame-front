import launcherInfo from "../launcher/launcherInfo";
import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { FacilityFrame, FacilityFrameClass } from "./facilityFrame";
import { FacilityInfo } from "./facilityInfo";
import { FacilityManager, FacilityManagerClass } from "./facilityManager";

export default class FacilityElementHandler implements ObjectElementHandler<FacilityManager> {
  manager: FacilityManager;
  mapManager: MapManager;

  constructor(facilityManager: FacilityManager, mapManager: MapManager) {
    this.manager = facilityManager;
    this.mapManager = mapManager;
  }

  getCurrentOutput = (facilities: FacilityFrame[]) => {
    let [energyOutput, evolveFactorOutput] = [0, 0];
    console.log(facilities);
    facilities.forEach((fac) => {
      const { mapPosX, mapPosY, info } = fac;
      console.log(this.mapManager.map[mapPosY][mapPosX]);
      if (this.mapManager.map[mapPosY][mapPosX].frame.activate) {
        console.log(info);
        energyOutput += info.energyOutput;
        evolveFactorOutput += info.evolveFactorOutput;
      }
    });
    return [energyOutput, evolveFactorOutput];
  };

  animate = (facilityManager: FacilityManager) => {
    const facilities = facilityManager.facilities;
    for (let i = 0; i < facilities.length; i++) {
      const nextFrameNumber = (facilities[i].frame.frameNumber + 1) % facilities[i].frame.info.frameSize;
      facilities[i].frame.frameNumber = nextFrameNumber;
      // console.log(facilities[i].info.frames[nextFrameNumber]);
    }
  };

  private drawAll = (callback: Function) => {
    const [canvas, context, facilities] = [this.manager.canvasRef.current, this.manager.contextRef.current, this.manager.facilities];
    const blockSize = this.mapManager.blockSize;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    facilities.forEach((facility) => {
      const { mapPosX, mapPosY, info } = facility.frame;
      const position = mapCoordConverter.mapToCanvasCoord(mapPosX, mapPosY, blockSize);
      const image = facility.frame.images[facility.frame.frameNumber];
      context.save();
      context.translate(position.posX, position.posY - blockSize * (info.height - 1));
      context.drawImage(image, 0, -blockSize * 0.25, blockSize * info.width, blockSize * info.height);
      context.restore();
      callback();
    });
  };

  drawNext = () => {
    const callback = () => {};
    this.drawAll(callback);
  };

  reDraw = () => {
    const callback = () => {};
    this.drawAll(callback);
  };
}
