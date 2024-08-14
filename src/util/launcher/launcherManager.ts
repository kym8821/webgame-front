import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectFrameManager } from "../object/objectManager/CanvasObjectFrameManager";
import { CanvasObjectManagerClass } from "../object/objectManager/canvasObjectManager";
import { LauncherFrame, LauncherFrameClass } from "./launcherFrame";

export interface LauncherManager extends CanvasObjectFrameManager<LauncherFrameClass, LauncherFrame> {
  animationFrame: AnimationFrameInfo;
  generationFrame?: undefined;
  movementFrame?: undefined;
}

export class LauncherManagerClass extends CanvasObjectManagerClass<LauncherManager, LauncherFrameClass, LauncherFrame> {}
