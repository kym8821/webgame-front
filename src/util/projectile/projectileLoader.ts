import porjectileImages from "../../assets/images/projectile/projectileImages";
import launcherDrawer from "../launcher/launcherDrawer";
import { LauncherFrame } from "../launcher/launcherFrame";
import launcherInfo, { LauncherInfo } from "../launcher/launcherInfo";
import { ObjectLoader } from "../objectLoader";
import { ProjectileFrame } from "./projectileFrame";
import projectileInfo, { ProjectileInfo } from "./projectileInfo";

export function getNextObject(launcher: LauncherFrame) {
  const lv = launcher.info.type;
  if (lv in launcherInfo) {
    const _launcher = launcherInfo.lv;
  }
  return undefined;
}

const loadFrames = (canvas: HTMLCanvasElement, projectileInfo: ProjectileInfo, launcherFrame: LauncherFrame) => {
  const launcherPosition = launcherDrawer.getPosition(canvas, launcherFrame);
  const projectile: ProjectileFrame = {
    info: {
      type: projectileInfo.name,
      damage: projectileInfo.damage,
      frameSize: projectileInfo.frameSize,
      frameNumber: 0,
      launcherX: launcherPosition.posX,
      launcherY: launcherPosition.posY,
      move: 0,
      angle: launcherFrame.info.angle,
      width: projectileInfo.width,
      height: projectileInfo.height,
    },
    frame: [],
    hitMonsters: [],
  };
  const frame = new Image();
  const src = `${projectileInfo.name}`;
  if (src in porjectileImages) {
    frame.src = porjectileImages[src];
    projectile.frame.push(frame);
  } else {
    console.error(`Frame ${src} not found in monsterImages object.`);
  }
  if (projectile.frame.length > 0) return projectile;
  return undefined;
};

const projectileLoader: ObjectLoader = { loadFrames, getNextObject };

export default projectileLoader;
