import mapCoordConverter from '../map/mapCoordConverter';
import { MapManager } from '../map/mapManager';
import ObjectElementHandler from '../object/ObjectElementHandler';
import { FacilityFrameClass } from './facilityFrame';
import facilityInfo from './facilityInfo';
import { FacilityManager, FacilityManagerClass } from './facilityManager';

export default class FacilityElementHandler implements ObjectElementHandler<FacilityManagerClass> {
  manager: FacilityManager;
  managerClass: FacilityManagerClass;
  mapManager: MapManager;

  constructor(facilityManager: FacilityManagerClass, mapManager: MapManager) {
    this.managerClass = facilityManager;
    this.manager = facilityManager.manager;
    this.mapManager = mapManager;
  }

  getPipeIndex = (x: number, y: number) => {
    const delta = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    let idx = 0;
    for (let i = 3; i >= 0; i--) {
      const [nextX, nextY] = [x + delta[i][0], y + delta[i][1]];
      if (this.managerClass.findByMapPoint(nextX, nextY)) idx += Math.pow(2, i);
    }
    return idx;
  };

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

  private drawAll = (frameHandler: Function, callback: Function) => {
    if (
      !this.manager.canvasRef ||
      !this.manager.contextRef ||
      !this.manager.canvasRef.current ||
      !this.manager.contextRef.current
    )
      return;
    const [canvas, context, facilities] = [
      this.manager.canvasRef.current,
      this.manager.contextRef.current,
      this.manager.objects,
    ];
    const blockSize = this.mapManager.blockSize;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    facilities.forEach((facility) => {
      const { mapPointX, mapPointY, info } = facility.frame;
      const position = mapCoordConverter.mapToCanvasCoord(mapPointX, mapPointY, blockSize);
      if (facility.frame.info.images.length === 0) return;
      frameHandler(facility);
      context.save();
      context.translate(position.posX, position.posY - blockSize * (info.height - 1));
      context.drawImage(
        facility.frame.info.images[facility.frame.frameNumber],
        0,
        0,
        blockSize * info.width,
        blockSize * info.height
      );
      context.restore();
      callback();
    });
  };

  drawNext = () => {
    const callback = () => {};
    const frameHandler = (facilityFrameClass: FacilityFrameClass) => {
      const facilityFrame = facilityFrameClass.frame;
      console.log(this.manager.objects);
      if (facilityFrame.info.tag.pipe) {
        facilityFrame.frameNumber = this.getPipeIndex(facilityFrame.mapPointX, facilityFrame.mapPointY);
      }
    };
    this.drawAll(frameHandler, callback);
  };

  reDraw = () => {
    const callback = () => {};
    const frameHandler = () => {};
    this.drawAll(frameHandler, callback);
  };

  reset = () => {
    this.managerClass.deleteAll();
    this.managerClass.add(FacilityFrameClass.loadFrame(facilityInfo.core, 9, 9));
    this.reDraw();
  };
}
