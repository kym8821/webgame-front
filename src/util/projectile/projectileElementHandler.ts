import { MapManager } from "../map/mapManager";
import { MonsterFrameClass } from "../monster/monsterFrame";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { Position } from "../Position";
import { ProjectileFrame } from "./projectileFrame";
import { ProjectileManager } from "./projectileManager";

export default class ProjectileElementHandler implements ObjectElementHandler<ProjectileManager> {
  mapManager: MapManager;
  manager: ProjectileManager;
  constructor(projectileManager: ProjectileManager, mapManager: MapManager) {
    this.manager = projectileManager;
    this.mapManager = mapManager;
  }
  animate = () => {};
  drawAll = (callback: Function) => {
    const [canvas, context] = [this.manager.canvasRef.current, this.manager.contextRef.current];
    const projectiles = this.manager.objects;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height); // 이전 내용을 지우기
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i].frame;
      const frameNumber = projectile.frameNumber;
      const position = projectiles[i].getPosition(canvas.width, canvas.height, this.mapManager.blockSize);
      context.save();
      context.translate(position.posX + this.mapManager.blockSize / 2, position.posY + this.mapManager.blockSize / 2);
      context.rotate(projectile.angle);
      context.drawImage(projectile.images[frameNumber], -position.width / 2, -position.height / 2, position.width, position.height);
      context.restore();
      callback(projectile, position);
    }
  };
  drawNext = (monsters: MonsterFrameClass[]) => {
    const callback = (projectile: ProjectileFrame, position: Position) => {
      const canvas = this.manager.canvasRef.current;
      if (!canvas) return;
      const [canvasWidth, canvasHeight] = [canvas.width, canvas.height];
      const blockSize = this.mapManager.blockSize;
      projectile.move -= 2;
      projectile.frameNumber = (projectile.frameNumber + 1) % blockSize;
      for (let i = 0; i < monsters.length; i++) {
        const monster = monsters[i];
        const monsterPosition: Position = monster.getPosition(canvasWidth, canvasHeight, blockSize);
        if (position.boundX < monsterPosition.posX || position.posX > monsterPosition.boundX) continue;
        if (position.boundY < monsterPosition.posY || position.posY > monsterPosition.boundY) continue;
        if (projectile.hitMonsters.includes(monster.frame.id)) continue;
        monster.frame.info.lifePoint -= projectile.info.damage;
        projectile.hitMonsters.push(monster.frame.id);
        if (monster.frame.info.lifePoint <= 0) {
          monsters.splice(i, 1);
          i -= 1;
        }
      }
    };
    this.drawAll(callback);
  };
  reDraw = () => {
    const callback = () => {};
    this.drawAll(callback);
  };
}
