import { ObjectFrame } from "../objectFrame";

export interface LauncherFrame extends ObjectFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    mapStartX: number;
    mapStartY: number;
    width: number;
    height: number;
    angle: number;
    projectileId: string;
    projectileSpeed: number;
  };
}
