import { LauncherFrame } from "../launcher/launcherFrame";
import { ObjectFrame } from "../object/objectFrame";
import { objectType } from "../object/objectInfo";
import { ProjectileInfo } from "./projectileInfo";

export interface ProjectileFrame extends ObjectFrame {
  info: ProjectileInfo;
  frameNumber: number;
  launcherX: number;
  launcherY: number;
  move: number;
  angle: number;
  hitMonsters: number[];
}
