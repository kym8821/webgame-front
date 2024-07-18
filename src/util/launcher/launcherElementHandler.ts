import launcherImages from "../../assets/images/launcher/launcherImages";
import mapCoordConverter from "../map/mapCoordConverter";
import { MapManager } from "../map/mapManager";
import MonsterElementHandler from "../monster/monsterElementHandler";
import MonsterFrame from "../monster/monsterFrame";
import { MonsterManager } from "../monster/monsterManager";
import { Position } from "../Position";
import projectileInfo from "../projectile/projectileInfo";
import { LauncherFrame } from "./launcherFrame";
import { LauncherInfo } from "./launcherInfo";

export default class LauncherElementHandler {
  mapManager: MapManager;
  monsterHandler: MonsterElementHandler;

  constructor(mapManager: MapManager) {
    this.mapManager = mapManager;
    this.monsterHandler = new MonsterElementHandler(mapManager);
  }

  getPosition = (canvas: HTMLCanvasElement, launcher: LauncherFrame) => {
    const info = launcher.info;
    const position = mapCoordConverter.mapToCanvasCoord(launcher.mapStartX, launcher.mapStartY, this.mapManager.blockSize);
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < launchers.length; i++) {
      const launcher = launchers[i];
      const activate = this.mapManager.map[launcher.mapStartY][launcher.mapStartX].activate;
      const monsterOnFront = monsters.monsters.at(0);
      const [info, frame] = [launcher.info, launcher.frame];
      const frameNumber = launcher.frameNumber;
      const position = this.getPosition(canvas, launcher);
      context.save();
      context.translate(position.posX + this.mapManager.blockSize / 2, position.posY + this.mapManager.blockSize / 2);
      if (activate && monsters.monsters.length > 0 && monsterOnFront) {
        launcher.angle = this.getLauncherAngle(canvas, monsterOnFront, launcher);
        context.rotate(launcher.angle);
      }
      context.drawImage(frame[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();
    }
  };

  loadFrames = (launcherInfo: LauncherInfo, mapStartX: number, mapStartY: number) => {
    const launcher: LauncherFrame = {
      info: launcherInfo,
      angle: 0,
      projectileId: 1,
      frameNumber: 0,
      mapStartX: mapStartX,
      mapStartY: mapStartY,
      frame: [],
    };

    const frame = new Image();
    frame.src = launcherInfo.src;
    launcher.frame.push(frame);
    if (launcher.frame.length > 0) return launcher;
    return undefined;
  };
}
