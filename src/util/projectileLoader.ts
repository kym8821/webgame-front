import porjectileImages from "../assets/images/projectileImages";
import ProjectileFrame from "./projectileFrame";
import { ProjectileInfo } from "./projectileInfo";

const loadProjectileFrames = (projectileInfo: ProjectileInfo) => {
  const projectile: ProjectileFrame = {
    info: {
      type: projectileInfo.name,
      posX: 1,
      //posY: Math.random() * 3,
      posY: 1,
      damage: projectileInfo.damage,
      frameSize: projectileInfo.frameSize,
      frameNumber: 0,
      width: projectileInfo.width,
      height: projectileInfo.height,
    },
    frame: [],
  };
  for (let i = 0; i < projectileInfo.frameSize; i++) {
    const frame = new Image();
    const src = `${projectileInfo.name}${i}`;
    if (src in porjectileImages) {
      frame.src = porjectileImages[src];
      projectile.frame.push(frame);
    } else {
      console.error(`Frame ${src} not found in monsterImages object.`);
    }
  }
  if (projectile.frame.length > 0) return projectile;
  return undefined;
};

const projectileLoader = { loadProjectileFrames };

export default projectileLoader;
