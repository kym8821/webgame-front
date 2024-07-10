import { ObjectInfo, objectType } from "../object/objectInfo";

export interface LauncherInfo extends ObjectInfo {
  lv: number;
  shootRate: number;
  projectileSpeed: number;
}

const launcherInfo: Record<string, LauncherInfo> = {
  lv1: {
    type: objectType.launcher,
    name: "lv1",
    frameSize: 1,
    width: 140,
    height: 100,
    lv: 1,
    shootRate: 1,
    projectileSpeed: 1,
  },
};

export default launcherInfo;
