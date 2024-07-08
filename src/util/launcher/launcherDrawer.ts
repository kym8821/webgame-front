import monsterDrawer from "../monster/monsterDrawer";
import MonsterFrame from "../monster/monsterFrame";
import { MonsterManager } from "../monster/monsterManager";
import { ObjectDrawer, Position } from "../objectDrawer";
import { ObjectFrame } from "../objectFrame";
import { LauncherFrame } from "./launcherFrame";

const getPosition = (canvas: HTMLCanvasElement, launcher: LauncherFrame) => {
  const info = launcher.info;
  const posX = canvas.width * 0.5;
  const posY = canvas.height * 0.7;
  const width = info.width * (canvas.width * 0.0005);
  const height = info.height * (canvas.width * 0.0005);
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

function getLauncherAngle(canvas: HTMLCanvasElement, monster: MonsterFrame, launcher: LauncherFrame) {
  const monsterPosition: Position = monsterDrawer.getPosition(canvas, monster);
  const launcherPosition: Position = getPosition(canvas, launcher);
  const hypo = monsterPosition.posX - launcherPosition.posX;
  const height = Math.abs(monsterPosition.posY - launcherPosition.posY);
  let angle = 1;
  if (hypo < 0) angle = Math.atan2(height, -hypo);
  if (hypo >= 0) angle = Math.PI / 2 + (Math.PI / 2 - Math.atan2(height, hypo));
  return angle;
}

const draw = (
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
  launchers: LauncherFrame[],
  monsters: MonsterManager,
  toChange: boolean
) => {
  if (!canvas || !context) return;
  const frontMonster = monsters.objects.at(0);
  for (let i = 0; i < launchers.length; i++) {
    const launcher = launchers[i];
    const [info, frame] = [launcher.info, launcher.frame];
    const frameNumber = info.frameNumber;
    const position = getPosition(canvas, launcher);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(position.posX + position.width / 2, position.posY + position.height / 2);
    if (frontMonster) {
      launcher.info.angle = getLauncherAngle(canvas, frontMonster, launcher);
      context.rotate(launcher.info.angle);
    }

    context.drawImage(frame[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
    context.restore();
  }
};

const launcherDrawer: ObjectDrawer = { draw, getPosition };
export default launcherDrawer;
