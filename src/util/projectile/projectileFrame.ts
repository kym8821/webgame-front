import porjectileImages from "../../assets/images/projectile/projectileImages";
import { LauncherFrame } from "../launcher/launcherFrame";
import mapCoordConverter from "../map/mapCoordConverter";
import { ObjectFrame, ObjectFrameClassType } from "../object/objectFrame";
import { Position } from "../Position";
import { ProjectileInfo } from "./projectileInfo";

export interface ProjectileFrame extends ObjectFrame<ProjectileInfo> {
  info: ProjectileInfo;
  frameNumber: number;
  move: number;
  angle: number;
  hitMonsters: number[];
}

export class ProjectileFrameClass implements ObjectFrameClassType<ProjectileFrame, ProjectileInfo> {
  static loadFrame = (projectileInfo: ProjectileInfo, launcherFrame: LauncherFrame) => {
    const projectile: ProjectileFrame = {
      info: projectileInfo,
      frameNumber: 0,
      mapPointX: launcherFrame.mapPointX,
      mapPointY: launcherFrame.mapPointY,
      move: 0,
      angle: launcherFrame.angle,
      images: [],
      hitMonsters: [],
    };
    const frame = new Image();
    const src = `${projectileInfo.name}`;
    if (src in porjectileImages) {
      frame.src = porjectileImages[src];
      projectile.images.push(frame);
    } else {
      console.error(`Frame ${src} not found in monsterImages object.`);
    }
    if (projectile.images.length > 0) return new ProjectileFrameClass(projectile);
    return undefined;
  };
  constructor(projectileFrame: ProjectileFrame) {
    this.frame = projectileFrame;
  }
  frame: ProjectileFrame;
  getPosition = (canvasWidth: number, canvasHeight: number, blockSize: number) => {
    const info = this.frame.info;
    const weight = canvasWidth * 0.01;
    const dist = weight * this.frame.move;
    const launcherPosition = mapCoordConverter.mapToCanvasCoord(this.frame.mapPointX, this.frame.mapPointY, blockSize);
    const [posX, posY] = [
      launcherPosition.posX + dist * Math.cos(this.frame.angle),
      launcherPosition.posY + dist * Math.sin(this.frame.angle),
    ];
    const width = info.width * (canvasWidth * 0.0005);
    const height = info.height * (canvasWidth * 0.0005);
    return {
      posX: posX,
      posY: posY,
      boundX: posX + width,
      boundY: posY + height,
      width: width,
      height: height,
    } as Position;
  };
}
