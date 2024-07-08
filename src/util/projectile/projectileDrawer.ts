import monsterDrawer from "../monster/monsterDrawer";
import MonsterFrame from "../monster/monsterFrame";
import { ObjectDrawer, Position } from "../objectDrawer";
import { ProjectileFrame } from "./projectileFrame";

const getPosition = (canvas: HTMLCanvasElement, projectile: ProjectileFrame) => {
  const ratio = canvas.width / 1920;
  const info = projectile.info;
  const weight = canvas.width * 0.01;
  const dist = weight * info.move;
  const [posX, posY] = [info.launcherX + dist * Math.cos(info.angle), info.launcherY + dist * Math.sin(info.angle)];
  const [width, height] = [info.width * ratio, info.height * ratio];
  return {
    posX: posX,
    posY: posY,
    boundX: posX + width,
    boundY: posY + height,
    width: width,
    height: height,
  } as Position;
};

const draw = (
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
    const frameNumber = info.frameNumber;
    const frameSize = info.frameSize;
    const position = getPosition(canvas, projectile);

    context.save();
    context.translate(position.posX + position.width / 2, position.posY + position.height / 2);
    context.rotate(info.angle);
    context.drawImage(frame[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
    context.restore();

    if (toChange) {
      projectiles[i].info.move -= 1;
      projectiles[i].info.frameNumber = (frameNumber + 1) % frameSize;
    }

    for (let j = 0; j < monsters.length; j++) {
      const monster = monsters[j];
      const monsterPosition: Position = monsterDrawer.getPosition(canvas, monster);
      if (position.boundX < monsterPosition.posX || position.posX > monsterPosition.boundX) continue;
      if (position.boundY < monsterPosition.posY || position.posY > monsterPosition.boundY) continue;
      if (projectile.hitMonsters.includes(monster.info.id)) continue;
      monster.info.lifePoint -= projectile.info.damage;
      projectile.hitMonsters.push(monster.info.id);
      if (monster.info.lifePoint <= 0) {
        monsters.splice(j, 1);
        //monsterDrawer.draw(canvas, context, monsters, false);
        j -= 1;
      }
    }
  }
};

const projectileDrawer: ObjectDrawer = { draw, getPosition };
export default projectileDrawer;
