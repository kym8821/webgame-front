import { CanvasObjectFrameManager } from "../object/CanvasObjectFrameManager";
import { CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { LauncherFrame, LauncherFrameClass } from "./launcherFrame";

export interface LauncherManager extends CanvasObjectFrameManager<LauncherFrameClass, LauncherFrame> {
  generationFrame: undefined;
  movementFrame: undefined;
}

export class LauncherManagerClass implements CanvasObjectManagerClassType<LauncherManager> {
  constructor(launcherManager: LauncherManager) {
    this.manager = launcherManager;
  }
  manager: LauncherManager;
  delete = (callback: (launcher: LauncherFrameClass) => boolean) => {
    const launchers = this.manager.objects;
    for (let i = 0; i < launchers.length; i++) {
      const launcher = launchers[i];
      if (callback(launcher)) {
        launchers.splice(i, 1);
        i -= 1;
      }
    }
  };
  add = (launcher: LauncherFrameClass) => {
    this.manager.objects.push(launcher);
  };
}
