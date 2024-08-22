import mapCoordConverter from "../map/mapCoordConverter";
import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { LauncherInfo } from "./launcherInfo";

export interface LauncherFrame extends ObjectFrame<LauncherInfo> {
  angle: number;
  projectileId: number;
  frameNumber: number;
}

export class LauncherFrameClass implements ObjectFrameClassType<LauncherFrame, LauncherInfo> {
  static loadFrame = (launcherInfo: LauncherInfo, mapPointX: number, mapPointY: number) => {
    const launcher: LauncherFrame = {
      info: launcherInfo,
      angle: 0,
      projectileId: 1,
      frameNumber: 0,
      mapPointX: mapPointX,
      mapPointY: mapPointY,
      images: [],
    };
    for (let i = 0; i < launcherInfo.images.length; i++) {
      const image = launcherInfo.images[i];
      launcher.images.push(image);
    }
    if (launcher.images.length > 0) return new LauncherFrameClass(launcher);
    return undefined;
  };
  constructor(launcherFrame: LauncherFrame) {
    this.frame = launcherFrame;
  }
  frame: LauncherFrame;
  getPosition = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
    const info = this.frame.info;
    const position = mapCoordConverter.mapToCanvasCoord(this.frame.mapPointX, this.frame.mapPointY, blockSize);
    const posX = position.posX;
    const posY = position.posY;
    const width = info.width * (canvasWidth * 0.0005);
    const height = info.height * (canvasWidth * 0.0005);
    const boundX = posX + width;
    const boundY = posY + height;
    return {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      boundX: boundX,
      boundY: boundY,
    } as Position;
  };
}
