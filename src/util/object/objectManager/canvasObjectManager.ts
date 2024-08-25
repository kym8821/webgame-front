import { CanvasManager } from './CanvasManager';
import { ObjectFrame, ObjectFrameClassType } from '../objectFrame';
import { ObjectInfo } from '../objectInfo';

export interface CanvasObjectManager<
  T1 extends ObjectFrameClassType<T2, T3>,
  T2 extends ObjectFrame<T3>,
  T3 extends ObjectInfo
> extends CanvasManager {
  objects: T1[];
}

export interface CanvasObjectManagerClassType<
  T1 extends CanvasObjectManager<T2, T3, T4>,
  T2 extends ObjectFrameClassType<T3, T4>,
  T3 extends ObjectFrame<T4>,
  T4 extends ObjectInfo
> {
  manager: T1;
  delete: Function;
  deleteAll: Function;
  deleteByMapPoint: Function;
  add: Function;
}

export abstract class CanvasObjectManagerClass<
  T1 extends CanvasObjectManager<T2, T3, T4>,
  T2 extends ObjectFrameClassType<T3, T4>,
  T3 extends ObjectFrame<T4>,
  T4 extends ObjectInfo
> implements CanvasObjectManagerClassType<T1, T2, T3, T4>
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
  findByMapPoint = (mpx: number, mpy: number) => {
    for (let i = 0; i < this.manager.objects.length; i++) {
      const obj = this.manager.objects[i].frame;
      const { mapPointX, mapPointY } = obj;
      const [boundX, boundY] = [mapPointX + (obj.info.width - 1), mapPointY + (obj.info.height - 1)];
      if (mpx < mapPointX || mpy < mapPointY) continue;
      if (mpx > boundX || mpy > boundY) continue;
      return obj;
    }
  };
}
