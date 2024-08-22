import { ObjectInfo, objectType } from "../object/objectInfo";
import launcherImages from "../../assets/images/launcher/launcherImages";
import mapImages from "../../assets/images/map/mapImages";

interface LauncherTag {
  shooter: boolean;
  objectRemover: boolean;
}

export interface LauncherInfo extends ObjectInfo {
  id: number;
  lv: number;
  shootRate: number;
  projectileSpeed: number;
  energy: number;
  gas: number;
  shootCost: number;
  tag: LauncherTag;
}

export function isLauncherInfo(obj: LauncherInfo) {
  if (
    typeof obj.id === "number" &&
    typeof obj.lv === "number" &&
    typeof obj.shootRate === "number" &&
    typeof obj.projectileSpeed === "number"
  ) {
    return true;
  }
  return false;
}

const launcherInfo: Record<string, LauncherInfo> = {
  lv1: {
    id: 1,
    type: objectType.launcher,
    name: "석궁",
    frameSize: 1,
    width: 140,
    height: 100,
    lv: 1,
    src: [launcherImages.lv1],
    images: [],
    shootRate: 1,
    projectileSpeed: 1,
    energy: 10,
    gas: 10,
    shootCost: 1,
    tag: {
      shooter: true,
      objectRemover: false,
    },
  },
  launcherRemover: {
    id: 2,
    type: objectType.launcher,
    name: "발사체 제거",
    frameSize: 1,
    width: 100,
    height: 100,
    lv: 1,
    src: [mapImages.tile],
    images: [],
    shootRate: 1,
    projectileSpeed: 1,
    energy: -5,
    gas: -5,
    shootCost: 1,
    tag: {
      shooter: false,
      objectRemover: true,
    },
  },
};

export function getLauncherInfoById(id: number): LauncherInfo | undefined {
  const infoList = Object.values(launcherInfo);
  let ret: LauncherInfo | undefined = undefined;
  infoList.forEach((info) => {
    if (info.id === id) {
      ret = info;
    }
  });
  return ret;
}

export default launcherInfo;
