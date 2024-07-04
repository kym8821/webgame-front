import { CanvasObjectManager } from '../canvasObjectManager';
import { LauncherFrame } from './launcherFrame';

export interface LauncherManager extends CanvasObjectManager {
  objects: LauncherFrame[];
}
