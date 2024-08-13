import { CanvasObjectManager, CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { ProjectileFrame, ProjectileFrameClass } from "./projectileFrame";

export interface ProjectileManager extends CanvasObjectManager {
  projectiles: ProjectileFrameClass[];
}

export class ProjectileManagerClass implements CanvasObjectManagerClassType<ProjectileManager> {
  constructor(projectileManager: ProjectileManager) {
    this.manager = projectileManager;
  }
  manager: ProjectileManager;
  delete: Function = (callback: (arg: ProjectileFrameClass) => boolean) => {
    for (let i = 0; i < this.manager.projectiles.length; i++) {
      const projectile = this.manager.projectiles[i];
      if (callback(projectile)) {
        this.manager.projectiles.splice(i, 1);
        i -= 1;
      }
    }
  };
  add: Function = (projectileFrame: ProjectileFrameClass) => {
    this.manager.projectiles.push(projectileFrame);
  };
}
