import { CanvasObjectManager } from "../object/canvasObjectManager";
import { ProjectileFrame } from "./projectileFrame";

export interface ProjectileManager extends CanvasObjectManager {
  projectiles: ProjectileFrame[];
}
