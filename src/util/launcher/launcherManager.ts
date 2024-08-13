import { AnimationFrameInfo } from "../object/animationFrameInfo";
import { CanvasObjectManager, CanvasObjectManagerClassType } from "../object/canvasObjectManager";
import { LauncherFrame, LauncherFrameClass } from "./launcherFrame";

export interface LauncherManager extends CanvasObjectManager {
  launchers: LauncherFrameClass[];
}

export class LauncherManagerClass implements CanvasObjectManagerClassType<LauncherManager> {
  constructor(launcherManager: LauncherManager) {
    this.manager = launcherManager;
  }
  manager: LauncherManager;
  delete = (callback: (launcher: LauncherFrameClass) => boolean) => {
    const launchers = this.manager.launchers;
    for (let i = 0; i < launchers.length; i++) {
      const launcher = launchers[i];
      if (callback(launcher)) {
        launchers.splice(i, 1);
        i -= 1;
      }
    }
  };
  add = (launcher: LauncherFrameClass) => {
    this.manager.launchers.push(launcher);
  };
}
