import { MapManager } from "../map/mapManager";
import { MonsterFrameClass } from "../monster/monsterFrame";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { Position } from "../Position";
import { LauncherFrameClass } from "./launcherFrame";
import { LauncherManager } from "./launcherManager";

export default class LauncherElementHandler implements ObjectElementHandler<LauncherManager> {
  mapManager: MapManager;
  manager: LauncherManager;

  constructor(manager: LauncherManager, mapManager: MapManager) {
    this.mapManager = mapManager;
    this.manager = manager;
  }

  getLauncherAngle = (monster: MonsterFrameClass, launcher: LauncherFrameClass) => {
    if (!this.manager.canvasRef || !this.manager.contextRef || !this.manager.canvasRef.current || !this.manager.contextRef.current) return;
    const canvas = this.manager.canvasRef.current;
    if (!canvas) return;
    const monsterPosition: Position = monster.getPosition(canvas.width, canvas.height, this.mapManager.blockSize);
    const launcherPosition: Position = launcher.getPosition(canvas.width, canvas.height, this.mapManager.blockSize);
    const hypo = monsterPosition.posX - launcherPosition.posX;
    const height = Math.abs(monsterPosition.posY - launcherPosition.posY);
    let angle = 1;
    if (hypo < 0) angle = Math.atan2(height, -hypo);
    if (hypo >= 0) angle = Math.PI / 2 + (Math.PI / 2 - Math.atan2(height, hypo));
    return angle;
  };

  private drawAll = (callback: Function) => {
    if (!this.manager.canvasRef || !this.manager.contextRef || !this.manager.canvasRef.current || !this.manager.contextRef.current) return;
    const [canvas, context] = [this.manager.canvasRef.current, this.manager.contextRef.current];
    if (!canvas || !context) return;
    const launchers = this.manager.objects;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < launchers.length; i++) {
      const [launcherFrame, launcherInfo] = [launchers[i].frame, launchers[i].frame.info];
      const frameNumber = launcherFrame.frameNumber;
      const position = launchers[i].getPosition(canvas.width, canvas.height, this.mapManager.blockSize);
      context.save();
      context.translate(position.posX + this.mapManager.blockSize / 2, position.posY + this.mapManager.blockSize / 2);
      callback(launcherFrame);
      context.drawImage(launcherFrame.images[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();
    }
  };

  drawNext = (monsters: MonsterFrameClass[]) => {
    const callback = (launcherFrame: LauncherFrameClass) => {
      if (!this.manager.canvasRef || !this.manager.contextRef || !this.manager.canvasRef.current || !this.manager.contextRef.current)
        return;
      const monsterOnFront = monsters.at(0);
      const activate = this.mapManager.map[launcherFrame.frame.mapPointY][launcherFrame.frame.mapPointX].frame.activate;
      const context = this.manager.contextRef.current;
      if (!context || !activate) return;
      if (monsters.length <= 0 || !monsterOnFront) return;
      const angle = this.getLauncherAngle(monsterOnFront, launcherFrame);
      if (angle) {
        launcherFrame.frame.angle = angle;
        context.rotate(angle);
      }
    };
    this.drawAll(callback);
  };

  reDraw = () => {
    const callback = () => {};
    this.drawAll(callback);
  };

  animate = () => {
    throw new Error("invalid function call : launcher animate");
  };
}
