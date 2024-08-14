import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectFrameManager } from "../object/objectManager/CanvasObjectFrameManager";
import { CanvasObjectManagerClass, CanvasObjectManagerClassType } from "../object/objectManager/canvasObjectManager";
import { ProjectileFrame, ProjectileFrameClass } from "./projectileFrame";

export interface ProjectileManager extends CanvasObjectFrameManager<ProjectileFrameClass, ProjectileFrame> {
  animationFrame: AnimationFrameInfo;
  generationFrame: AnimationFrameInfo;
  movementFrame?: undefined;
}

export class ProjectileManagerClass extends CanvasObjectManagerClass<ProjectileManager, ProjectileFrameClass, ProjectileFrame> {}
