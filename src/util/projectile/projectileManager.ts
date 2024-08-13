import { CanvasObjectFrameManager } from "../object/CanvasObjectFrameManager";
import { CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { ProjectileFrame, ProjectileFrameClass } from "./projectileFrame";

export interface ProjectileManager extends CanvasObjectFrameManager<ProjectileFrameClass, ProjectileFrame> {
  movementFrame: undefined;
}

export class ProjectileManagerClass implements CanvasObjectManagerClassType<ProjectileManager> {
  constructor(projectileManager: ProjectileManager) {
    this.manager = projectileManager;
  }
  manager: ProjectileManager;
  delete: Function = (callback: (arg: ProjectileFrameClass) => boolean) => {
    for (let i = 0; i < this.manager.objects.length; i++) {
      const projectile = this.manager.objects[i];
      if (callback(projectile)) {
        this.manager.objects.splice(i, 1);
        i -= 1;
      }
    }
  };
  add: Function = (projectileFrame: ProjectileFrameClass) => {
    this.manager.objects.push(projectileFrame);
  };
}
