import mapCoordConverter from "../map/mapCoordConverter";
import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { LauncherInfo } from "./launcherInfo";

export interface LauncherFrame extends ObjectFrame {
  info: LauncherInfo;
  angle: number;
  projectileId: number;
  frameNumber: number;
  mapStartX: number;
  mapStartY: number;
}

export class LauncherFrameClass implements ObjectFrameClassType<LauncherFrame> {
  loadFrame = (launcherInfo: LauncherInfo, startMapX: number, startMapY: number) => {
    const launcher: LauncherFrame = {
      info: launcherInfo,
      angle: 0,
      projectileId: 1,
      frameNumber: 0,
      mapStartX: startMapX,
      mapStartY: startMapY,
      images: [],
    };
    const frame = new Image();
    frame.src = launcherInfo.src;
    launcher.images.push(frame);
    if (launcher.images.length > 0) return launcher;
    return undefined;
  };
  constructor(launcherFrame: LauncherFrame) {
    this.frame = launcherFrame;
  }
  frame: LauncherFrame;
  getPosition = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
    const info = this.frame.info;
    const position = mapCoordConverter.mapToCanvasCoord(this.frame.mapStartX, this.frame.mapStartY, blockSize);
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
