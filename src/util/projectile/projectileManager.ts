import { CanvasObjectManager } from "../canvasObjectManager";
import { ProjectileFrame } from "./projectileFrame";

export interface ProjectileManager extends CanvasObjectManager {
  objects: ProjectileFrame[];
}
