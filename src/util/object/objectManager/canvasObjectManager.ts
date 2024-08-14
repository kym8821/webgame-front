import { CanvasManager } from "./CanvasManager";
import { ObjectFrame, ObjectFrameClassType } from "../objectFrame";

export interface CanvasObjectManager<T1 extends ObjectFrameClassType<T2>, T2 extends ObjectFrame> extends CanvasManager {
  objects: T1[];
}

export interface CanvasObjectManagerClassType<
  T1 extends CanvasObjectManager<T2, T3>,
  T2 extends ObjectFrameClassType<T3>,
  T3 extends ObjectFrame
> {
  manager: T1;
  delete: Function;
  deleteAll: Function;
  deleteByMapPoint: Function;
  add: Function;
}

export abstract class CanvasObjectManagerClass<
  T1 extends CanvasObjectManager<T2, T3>,
  T2 extends ObjectFrameClassType<T3>,
  T3 extends ObjectFrame
> implements CanvasObjectManagerClassType<T1, T2, T3>
{
  constructor(manager: T1) {
    this.manager = manager;
  }
  manager: T1;
  add = (frameClass: T2) => {
    this.manager.objects.push(frameClass);
  };
  delete = (callback: (arg: T2) => boolean) => {
    for (let i = 0; i < this.manager.objects.length; i++) {
      if (callback(this.manager.objects[i])) {
        this.manager.objects.splice(i, 1);
        i -= 1;
      }
    }
  };
  deleteAll = () => {
    this.manager.objects.splice(0, this.manager.objects.length);
  };
  deleteByMapPoint = (mpx: number, mpy: number) => {
    function callback(frameClass: T2) {
      const frame = frameClass.frame;
      if (frame.mapPointX === mpx && frame.mapPointY === mpy) return true;
      return false;
    }
    this.delete(callback);
  };
}
