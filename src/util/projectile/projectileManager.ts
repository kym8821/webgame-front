import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectFrameManager } from "../object/objectManager/CanvasObjectFrameManager";
import { CanvasObjectManagerClass, CanvasObjectManagerClassType } from "../object/objectManager/canvasObjectManager";
import { ProjectileFrame, ProjectileFrameClass } from "./projectileFrame";
import { ProjectileInfo } from "./projectileInfo";

export interface ProjectileManager extends CanvasObjectFrameManager<ProjectileFrameClass, ProjectileFrame, ProjectileInfo> {
  animationFrame: AnimationFrameInfo;
  generationFrame: AnimationFrameInfo;
  movementFrame?: undefined;
}

export class ProjectileManagerClass extends CanvasObjectManagerClass<
  ProjectileManager,
  ProjectileFrameClass,
  ProjectileFrame,
  ProjectileInfo
> {}
