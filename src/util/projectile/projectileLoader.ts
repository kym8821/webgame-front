import porjectileImages from '../../assets/images/projectile/projectileImages';
import { LauncherFrame } from '../launcher/launcherFrame';
import { LauncherInfo } from '../launcher/launcherInfo';
import ProjectileFrame from './projectileFrame';
import projectileInfo, { ProjectileInfo } from './projectileInfo';

export function getNextObject(launcher: LauncherInfo) {
  const lv = launcher.lv;
  if (lv in projectileInfo) {
    return projectileInfo[lv];
  }
  return undefined;
}

const loadProjectileFrames = (projectileInfo: ProjectileInfo, launcherFrame: LauncherFrame) => {
  const projectile: ProjectileFrame = {
    info: {
      type: projectileInfo.name,
      posX: launcherFrame.info.posX,
      posY: launcherFrame.info.posY,
      damage: projectileInfo.damage,
      frameSize: projectileInfo.frameSize,
      frameNumber: 0,
      width: projectileInfo.width,
      height: projectileInfo.height,
    },
    frame: [],
  };
  const frame = new Image();
  const src = `${projectileInfo.name}`;
  if (src in porjectileImages) {
    frame.src = porjectileImages[src];
    projectile.frame.push(frame);
  } else {
    console.error(`Frame ${src} not found in monsterImages object.`);
  }
  // for (let i = 0; i < projectileInfo.frameSize; i++) {
  //   const frame = new Image();
  //   const src = `${projectileInfo.name}${i}`;
  //   if (src in porjectileImages) {
  //     frame.src = porjectileImages[src];
  //     projectile.frame.push(frame);
  //   } else {
  //     console.error(`Frame ${src} not found in monsterImages object.`);
  //   }
  // }
  if (projectile.frame.length > 0) return projectile;
  return undefined;
};

const projectileLoader = { loadProjectileFrames };

export default projectileLoader;
