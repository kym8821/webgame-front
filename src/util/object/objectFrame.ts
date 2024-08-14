import { Position } from "../Position";

export interface ObjectFrame {
  info: any;
  mapPointX: number;
  mapPointY: number;
  images: HTMLImageElement[];
}

export interface ObjectFrameClassType<T extends ObjectFrame> {
  frame: T;
  getPosition: (...args: any) => Position;
}
