import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectManager } from "../canvasObjectManager";
import { LauncherFrame } from "./launcherFrame";

export interface LauncherManager extends CanvasObjectManager {
  objects: LauncherFrame[];
}
