import { ObjectFrame, ObjectFrameClassType } from '../object/objectFrame';
import { ResourceInfo } from './resourceInfo';

export interface ResourceFrame extends ObjectFrame<ResourceInfo> {}

export default class ResourceFrameClass implements ObjectFrameClassType<ResourceFrame, ResourceInfo> {
  constructor(resourceFrame: ResourceFrame) {
    this.frame = resourceFrame;
  }
  frame: ResourceFrame;
  getPosition = () => {};
}
