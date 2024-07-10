import { LauncherFrame } from "../launcher/launcherFrame";
import { ObjectFrame } from "../objectFrame";
import { objectType } from "../objectInfo";
import { ProjectileInfo } from "./projectileInfo";

export interface ProjectileFrame extends ObjectFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    launcherX: number;
    launcherY: number;
    move: number;
    angle: number;
    width: number;
    height: number;
    damage: number;
  };
  hitMonsters: number[];
}
