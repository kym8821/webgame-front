import { AnimationFrameInfo } from "../object/animationFrameInfo";
import { CanvasObjectManager } from "../object/canvasObjectManager";
import { LauncherFrame } from "./launcherFrame";

export interface LauncherManager extends CanvasObjectManager {
  objects: LauncherFrame[];
}
