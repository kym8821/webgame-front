import { Position } from "../Position";
import { ObjectInfo } from "./objectInfo";

export interface ObjectFrame<T> {
  info: T;
  mapPointX: number;
  mapPointY: number;
  images: HTMLImageElement[];
}

export interface ObjectFrameClassType<T1 extends ObjectFrame<T2>, T2 extends ObjectInfo> {
  frame: T1;
  getPosition: (...args: any) => Position;
}
