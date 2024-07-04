import { ObjectDrawer, Position } from '../objectDrawer';
import ProjectileFrame from './projectileFrame';

const getPosition = (canvas: HTMLCanvasElement, projectile: ProjectileFrame) => {
  const info = projectile.info;
  const posX = info.posX * (canvas.width * 0.01);
  const posY = info.posY * canvas.height * 0.4 - info.height * (canvas.width * 0.0005);
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
  projectiles: ProjectileFrame[],
  toChange: boolean
) => {
  if (!canvas || !context) return;
  context.clearRect(0, 0, canvas.width, canvas.height); // 이전 내용을 지우기
  for (let i = 0; i < projectiles.length; i++) {
    const monster = projectiles[i];
    const [info, frame] = [monster.info, monster.frame];
    if (info.posX >= 100 || info.posY >= 10) {
      projectiles.splice(i, 1);
      i -= 1;
      continue;
    }
    const frameNumber = info.frameNumber;
    const frameSize = info.frameSize;
    const position = getPosition(canvas, monster);
    context.drawImage(frame[frameNumber], position.posX, position.posY, position.width, position.height);
    if (toChange) {
      projectiles[i].info.posX += 1;
      projectiles[i].info.frameNumber = (frameNumber + 1) % frameSize;
    }
  }
};

const projectileDrawer: ObjectDrawer = { draw, getPosition };
export default projectileDrawer;
