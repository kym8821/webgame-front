import { StringLiteral } from "typescript";
import { ObjectInfo, objectType } from "../object/objectInfo";
import launcherImages from "../../assets/images/launcher/launcherImages";

export interface LauncherInfo extends ObjectInfo {
  id: number;
  lv: number;
  shootRate: number;
  projectileSpeed: number;
  src: string;
  energy: number;
  gas: number;
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
    src: launcherImages.lv1,
    shootRate: 1,
    projectileSpeed: 1,
    energy: 10,
    gas: 10,
  },
};

export function getLauncherInfoById(id: number): LauncherInfo | undefined {
  const infoList = Object.values(launcherInfo);
  let ret: LauncherInfo | undefined = undefined;
  // console.log("InfoList:", infoList);
  // console.log("Searching for ID:", id);
  infoList.forEach((info) => {
    // console.log("Checking info:", info);
    if (info.id === id) {
      // console.log("Match found:", info);
      ret = info;
    }
  });
  return ret;
}

export default launcherInfo;
