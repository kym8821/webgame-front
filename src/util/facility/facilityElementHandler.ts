import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { FacilityManager } from "./facilityManager";

export default class FacilityElementHandler implements ObjectElementHandler<FacilityManager> {
  manager: FacilityManager;
  mapManager: MapManager;

  constructor(facilityManager: FacilityManager, mapManager: MapManager) {
    this.manager = facilityManager;
    this.mapManager = mapManager;
  }

  getCurrentOutput = () => {
    const facilities = this.manager.objects;
    let [energyOutput, evolveFactorOutput] = [0, 0];
    console.log(facilities);
    facilities.forEach((facilityFrameClass) => {
      const fac = facilityFrameClass.frame;
      const { mapPointX, mapPointY, info } = fac;
      console.log(this.mapManager.map[mapPointY][mapPointX]);
      if (this.mapManager.map[mapPointY][mapPointX].frame.activate) {
        console.log(info);
        energyOutput += info.energyOutput;
        evolveFactorOutput += info.evolveFactorOutput;
      }
    });
    return [energyOutput, evolveFactorOutput];
  };

  animate = () => {
    const facilities = this.manager.objects;
    for (let i = 0; i < facilities.length; i++) {
      const nextFrameNumber = (facilities[i].frame.frameNumber + 1) % facilities[i].frame.info.frameSize;
      facilities[i].frame.frameNumber = nextFrameNumber;
      // console.log(facilities[i].info.frames[nextFrameNumber]);
    }
  };

  private drawAll = (callback: Function) => {
    const [canvas, context, facilities] = [this.manager.canvasRef.current, this.manager.contextRef.current, this.manager.objects];
    const blockSize = this.mapManager.blockSize;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    facilities.forEach((facility) => {
      const { mapPointX, mapPointY, info } = facility.frame;
      const position = mapCoordConverter.mapToCanvasCoord(mapPointX, mapPointY, blockSize);
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
