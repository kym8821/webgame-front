import { Position } from "../Position";

export interface ObjectFrame {
  info: any;
  images: HTMLImageElement[];
}

export interface ObjectFrameClassType<T extends ObjectFrame> {
  frame: T;
  getPosition: (...args: any) => Position;
}
