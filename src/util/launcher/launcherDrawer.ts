import { ObjectDrawer, Position } from '../objectDrawer';
import { ObjectFrame } from '../objectFrame';
import { LauncherFrame } from './launcherFrame';

const getPosition = (canvas: HTMLCanvasElement, launcher: LauncherFrame) => {
  const info = launcher.info;
  const posX = 500;
  const posY = 500;
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

const draw = (
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
  launchers: LauncherFrame[],
  toChange: boolean
) => {
  if (!canvas || !context) return;
  for (let i = 0; i < launchers.length; i++) {
    const launcher = launchers[i];
    const [info, frame] = [launcher.info, launcher.frame];
    const frameNumber = info.frameNumber;
    const position = getPosition(canvas, launcher);
    context.clearRect(info.posX, info.posY, info.width, info.height);
    context.save();
    context.translate(info.posX + info.width / 2, info.posY + info.height / 2);
    const [posX, posY] = [info.posX, info.posY];
    console.log(posX, posY);
    context.rotate(info.radian - 0.01);
    context.clearRect(-info.width / 2, -info.height / 2, info.width, info.height);
    context.drawImage(frame[frameNumber], -info.width / 2, -info.height / 2, info.width, info.height);
    info.radian += 0.01;
    context.restore();
  }
};

const launcherDrawer: ObjectDrawer = { draw, getPosition };
export default launcherDrawer;
