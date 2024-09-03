import { AnimationFrameInfo } from "../animationFrameInfo";
import { CanvasObjectFrameManager } from "../object/objectManager/CanvasObjectFrameManager";
import { CanvasObjectManagerClass } from "../object/objectManager/canvasObjectManager";
import ResourceFrameClass, { ResourceFrame } from "./resourceFrame";
import { ResourceInfo } from "./resourceInfo";

export interface ResourceManager extends CanvasObjectFrameManager<ResourceFrameClass, ResourceFrame, ResourceInfo> {
  animationFrame: undefined;
  generationFrame: AnimationFrameInfo;
  movementFrame: AnimationFrameInfo;
}

export class ResourceManagerClass extends CanvasObjectManagerClass<ResourceManager, ResourceFrameClass, ResourceFrame, ResourceInfo> {}
