import { FacilityFrameClass } from "../facility/facilityFrame";
import { FacilityManagerClass } from "../facility/facilityManager";
import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { Position } from "../Position";
import ResourceFrameClass from "./resourceFrame";
import { ResourceManager, ResourceManagerClass } from "./resourceManager";

export default class ResourceElementHandler implements ObjectElementHandler<ResourceManagerClass> {
  constructor(managerClass: ResourceManagerClass, facilityManagerClass: FacilityManagerClass, mapManager: MapManager) {
    this.managerClass = managerClass;
    this.manager = managerClass.manager;
    this.mapManager = mapManager;
    this.facilityManager = facilityManagerClass;
  }
  managerClass: ResourceManagerClass;
  facilityManager: FacilityManagerClass;
  mapManager: MapManager;
  manager: ResourceManager;

  animate = () => {
    throw Error("resource handler : invalid call");
  };
  drawAll = (callback: Function) => {
    if (!this.managerClass.manager.contextRef || !this.managerClass.manager.contextRef.current) return;
    const context = this.managerClass.manager.contextRef.current;
    const objects = this.managerClass.manager.objects;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].frame.info.images.length === 0) continue;
      const frameClass = objects[i];
      const position = frameClass.getPosition(this.mapManager.blockSize);
      context.save();
      context.translate(position.posX, position.posY);
      context.drawImage(
        frameClass.frame.info.images[frameClass.frame.frameNumber],
        -position.width / 2,
        -position.height / 2,
        position.width,
        position.height
      );
      context.restore();
      callback(frameClass, position);
    }
  };
  drawNext = () => {
    const callback = (frameClass: ResourceFrameClass, resPos: Position) => {
      const resourceFrame = frameClass.frame;
      const [rmpx, rmpy] = mapCoordConverter.canvasToMapCoord(resPos.posX, resPos.posY, this.mapManager);
      const facility = this.facilityManager.findByMapPoint(rmpx, rmpy);
      if (!facility) return;
      const facFrame = new FacilityFrameClass(facility);
      const facPos = facFrame.getPosition(this.mapManager.blockSize);
      if (facility.info.tag.pipe) {
        if (resourceFrame.mapPointX !== facility.mapPointX || resourceFrame.mapPointY !== facility.mapPointY) {
          const [fcx, fcy] = [(facPos.boundX + facPos.posX) / 2, (facPos.boundY + facPos.posY) / 2];
          const [rcx, rcy] = [(resPos.boundX + resPos.posX) / 2, (resPos.boundY + resPos.posY) / 2];
          const limit = this.mapManager.blockSize * 0.05;
          if (Math.abs(fcx - rcx) >= limit || Math.abs(fcy - rcy) >= limit) return;
          frameClass.frame = {
            ...frameClass.frame,
            mapPointX: facility.mapPointX,
            mapPointY: facility.mapPointY,
            flag: false,
            move: 0,
            angle: (facility.direction * Math.PI) / 180,
          };
        } else {
          frameClass.frame.move += 1;
        }
      }
    };
    this.drawAll(callback);
  };
  reDraw = () => {};
  reset = () => {};
}
