import porjectileImages from "../../assets/images/projectile/projectileImages";
import LauncherElementHandler from "../launcher/launcherElementHandler";
import { LauncherFrame } from "../launcher/launcherFrame";
import launcherInfo from "../launcher/launcherInfo";
import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import MonsterElementHandler from "../monster/monsterElementHandler";
import MonsterFrame from "../monster/monsterFrame";
import { Position } from "../Position";
import defaultWindowSize from "../windowSize";
import { ProjectileFrame } from "./projectileFrame";
import { ProjectileInfo } from "./projectileInfo";

export default class ProjectileElementHandler {
  mapManager: MapManager;
  monsterHandler: MonsterElementHandler;
  launcherHandler: LauncherElementHandler;

  constructor(mapInfo: MapManager) {
    this.mapManager = mapInfo;
    this.monsterHandler = new MonsterElementHandler(mapInfo);
    this.launcherHandler = new LauncherElementHandler(mapInfo);
  }

  getNextObject = (launcher: LauncherFrame) => {
    const lv = launcher.info.type;
    if (lv in launcherInfo) {
      const _launcher = launcherInfo.lv;
    }
    return undefined;
  };

  loadFrames = (canvas: HTMLCanvasElement, projectileInfo: ProjectileInfo, launcherFrame: LauncherFrame) => {
    const projectile: ProjectileFrame = {
      info: {
        type: projectileInfo.name,
        damage: projectileInfo.damage,
        frameSize: projectileInfo.frameSize,
        frameNumber: 0,
        launcherX: launcherFrame.info.mapStartX,
        launcherY: launcherFrame.info.mapStartY,
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

  getPosition = (canvas: HTMLCanvasElement, projectile: ProjectileFrame) => {
    const ratio = canvas.width / defaultWindowSize.width;
    const info = projectile.info;
    const weight = canvas.width * 0.01;
    const dist = weight * info.move;
    const launcherPosition = mapCoordConverter.mapToCanvasCoord(info.launcherX, info.launcherY, this.mapManager.blockSize);
    const [posX, posY] = [launcherPosition.posX + dist * Math.cos(info.angle), launcherPosition.posY + dist * Math.sin(info.angle)];
    // const [width, height] = [info.width * ratio, info.height * ratio];
    const width = info.width * (canvas.width * 0.0005);
    const height = info.height * (canvas.width * 0.0005);
    return {
      posX: posX,
      posY: posY,
      boundX: posX + width,
      boundY: posY + height,
      width: width,
      height: height,
    } as Position;
  };

  draw = (
    canvas: HTMLCanvasElement | null,
    context: CanvasRenderingContext2D | null,
    projectiles: ProjectileFrame[],
    monsters: MonsterFrame[],
    toChange: boolean
  ) => {
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height); // 이전 내용을 지우기
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      const [info, frame] = [projectile.info, projectile.frame];
      if (!this.mapManager.map[info.launcherY][info.launcherX].activate) continue;
      const frameNumber = info.frameNumber;
      const frameSize = info.frameSize;
      const position = this.getPosition(canvas, projectile);

      context.save();
      context.translate(position.posX + this.mapManager.blockSize / 2, position.posY + this.mapManager.blockSize / 2);
      context.rotate(info.angle);
      context.drawImage(frame[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();

      if (toChange) {
        projectiles[i].info.move -= 2;
        projectiles[i].info.frameNumber = (frameNumber + 1) % frameSize;
      }

      for (let j = 0; j < monsters.length; j++) {
        const monster = monsters[j];
        const monsterPosition: Position = this.monsterHandler.getPosition(canvas, monster);
        if (position.boundX < monsterPosition.posX || position.posX > monsterPosition.boundX) continue;
        if (position.boundY < monsterPosition.posY || position.posY > monsterPosition.boundY) continue;
        if (projectile.hitMonsters.includes(monster.id)) continue;
        monster.info.lifePoint -= projectile.info.damage;
        projectile.hitMonsters.push(monster.id);
        if (monster.info.lifePoint <= 0) {
          monsters.splice(j, 1);
          //monsterDrawer.draw(canvas, context, monsters, false);
          j -= 1;
        }
      }
    }
  };
}
