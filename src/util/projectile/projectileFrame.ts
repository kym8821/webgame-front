import { LauncherFrame } from "../launcher/launcherFrame";
import { ObjectFrame } from "../objectFrame";
import { objectType } from "../objectInfo";
import { ProjectileInfo } from "./projectileInfo";

export interface ProjectileFrame extends ObjectFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    launcherX: number;
    launcherY: number;
    move: number;
    angle: number;
    width: number;
    height: number;
    damage: number;
  };
  hitMonsters: number[];
}

export function getProjectileFrame(projectile: ProjectileInfo, launcher: LauncherFrame) {
  return {
    frame: [],
    info: {
      type: objectType.projectile,
      frameSize: projectile.frameSize,
      frameNumber: 0,
      launcherX: launcher.info.posX,
      launcherY: launcher.info.posY,
      move: 0,
      angle: launcher.info.angle,
      width: projectile.width,
      height: projectile.height,
      damage: projectile.damage,
    },
    hitMonsters: [],
  } as ProjectileFrame;
}
