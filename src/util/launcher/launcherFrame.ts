import { ObjectFrame } from "../object/objectFrame";
import { LauncherInfo } from "./launcherInfo";

export interface LauncherFrame extends ObjectFrame {
  info: LauncherInfo;
  angle: number;
  projectileId: number;
  frameNumber: number;
  mapStartX: number;
  mapStartY: number;
}

// export interface LauncherInfo extends ObjectInfo {
//   id: number;
//   lv: number;
//   shootRate: number;
//   projectileSpeed: number;
//   src: string;
//   energy: number;
//   gas: number;
//   shootCost: number;
//   tag: LauncherTag;
// }
// export interface ObjectInfo {
//   type: string;
//   name: string;
//   frameSize: number;
//   width: number;
//   height: number;
// }
