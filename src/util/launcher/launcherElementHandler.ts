import launcherImages from "../../assets/images/launcher/launcherImages";
import mapDrawer from "../map/mapDrawer";
import { MapInfo } from "../map/mapInfo";
import MonsterElementHandler from "../monster/monsterElementHandler";
import MonsterFrame from "../monster/monsterFrame";
import { MonsterManager } from "../monster/monsterManager";
import { Position } from "../Position";
import projectileInfo from "../projectile/projectileInfo";
import { LauncherFrame } from "./launcherFrame";
import { LauncherInfo } from "./launcherInfo";

export default class LauncherElementHandler {
  mapInfo: MapInfo;
  monsterHandler: MonsterElementHandler;

  constructor(mapInfo: MapInfo) {
    this.mapInfo = mapInfo;
    this.monsterHandler = new MonsterElementHandler(mapInfo);
  }

  getPosition = (canvas: HTMLCanvasElement, launcher: LauncherFrame) => {
    const info = launcher.info;
    const ratio = (window.innerWidth * 0.8) / canvas.width;
    const position = mapDrawer.MapToCanvasCoord(info.mapStartX, info.mapStartY, this.mapInfo.blockSize);
    const posX = position.posX;
    const posY = position.posY;
    const width = info.width * (canvas.width * 0.0005);
    const height = info.height * (canvas.width * 0.0005);
    // const width = ratio * info.width;
    // const height = ratio * info.height;
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

  getLauncherAngle = (canvas: HTMLCanvasElement, monster: MonsterFrame, launcher: LauncherFrame) => {
    const monsterPosition: Position = this.monsterHandler.getPosition(canvas, monster);
    const launcherPosition: Position = this.getPosition(canvas, launcher);
    const hypo = monsterPosition.posX - launcherPosition.posX;
    const height = Math.abs(monsterPosition.posY - launcherPosition.posY);
    let angle = 1;
    if (hypo < 0) angle = Math.atan2(height, -hypo);
    if (hypo >= 0) angle = Math.PI / 2 + (Math.PI / 2 - Math.atan2(height, hypo));
    return angle;
  };

  draw = (
    canvas: HTMLCanvasElement | null,
    context: CanvasRenderingContext2D | null,
    launchers: LauncherFrame[],
    monsters: MonsterManager,
    toChange: boolean
  ) => {
    if (!canvas || !context) return;
    console.log(launchers);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < launchers.length; i++) {
      const launcher = launchers[i];
      const monsterOnFront = monsters.objects.at(0);
      const [info, frame] = [launcher.info, launcher.frame];
      const frameNumber = info.frameNumber;
      const position = this.getPosition(canvas, launcher);
      context.save();
      context.translate(position.posX + this.mapInfo.blockSize / 2, position.posY + this.mapInfo.blockSize / 2);
      if (monsters.objects.length > 0 && monsterOnFront) {
        launcher.info.angle = this.getLauncherAngle(canvas, monsterOnFront, launcher);
        context.rotate(launcher.info.angle);
      }
      context.drawImage(frame[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();
    }
  };

  loadFrames = (launcherInfo: LauncherInfo, mapStartX: number, mapStartY: number) => {
    const launcher: LauncherFrame = {
      info: {
        type: launcherInfo.name,
        mapStartX: mapStartX,
        mapStartY: mapStartY,
        frameSize: launcherInfo.frameSize,
        frameNumber: 0,
        width: launcherInfo.width,
        height: launcherInfo.height,
        angle: 0,
        projectileId: projectileInfo.lv1.name,
        projectileSpeed: launcherInfo.projectileSpeed,
      },
      frame: [],
    };
    const frame = new Image();
    const src = `${launcherInfo.name}`;
    if (src in launcherImages) {
      frame.src = launcherImages[src];
      launcher.frame.push(frame);
    } else {
      console.error(`Frame ${src} not found in monsterImages object.`);
    }
    if (launcher.frame.length > 0) return launcher;
    return undefined;
  };
}
