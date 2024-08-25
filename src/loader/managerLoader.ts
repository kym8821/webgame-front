import { FacilityManagerClass } from '../util/facility/facilityManager';
import { LauncherManagerClass } from '../util/launcher/launcherManager';
import { MapManagerClass } from '../util/map/mapManager';
import { MonsterManagerClass } from '../util/monster/monsterManager';
import { CanvasManager } from '../util/object/objectManager/CanvasManager';
import { ProjectileManagerClass } from '../util/projectile/projectileManager';
import { TotalScreenManager } from '../util/totalScreenManager';

export function loadTotalScreenManager() {
  const userScreenManager: CanvasManager = {
    canvasRef: null,
    contextRef: null,
  };
  const monsterManager: MonsterManagerClass = new MonsterManagerClass({
    animationFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    generationFrame: {
      lastFrameTime: 0,
      interval: 2000,
      animationFrame: null,
    },
    movementFrame: {
      lastFrameTime: 0,
      interval: 40,
      animationFrame: null,
    },
    damageFrame: {
      lastFrameTime: 0,
      interval: 1000,
      animationFrame: null,
    },
    objects: [],
    canvasRef: null,
    contextRef: null,
  });
  const projectileManager: ProjectileManagerClass = new ProjectileManagerClass({
    animationFrame: {
      lastFrameTime: 0,
      interval: 20,
      animationFrame: null,
    },
    generationFrame: {
      lastFrameTime: 0,
      interval: 1000,
      animationFrame: null,
    },
    movementFrame: undefined,
    objects: [],
    canvasRef: null,
    contextRef: null,
  });
  const mapManager: MapManagerClass = new MapManagerClass({
    numberMap: [],
    blockSize: window.innerWidth / 20,
    map: [[]],
    objects: [],
    canvasRef: null,
    contextRef: null,
    transformInfo: {
      scale: 1,
      panning: false,
      viewPos: { posX: 0, posY: 0 },
      startPos: { posX: 0, posY: 0 },
      minScale: 0.3,
      maxScale: 3,
    },
  });
  const facilityManager: FacilityManagerClass = new FacilityManagerClass({
    generationFrame: {
      lastFrameTime: 0,
      interval: 1000,
      animationFrame: null,
    },
    animationFrame: {
      lastFrameTime: 0,
      interval: 1000,
      animationFrame: null,
    },
    objects: [],
    canvasRef: null,
    contextRef: null,
  });
  const launcherManager: LauncherManagerClass = new LauncherManagerClass({
    animationFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    objects: [],
    canvasRef: null,
    contextRef: null,
  });
  const totalScreenManager: TotalScreenManager = {
    userScreenManager: userScreenManager,
    launcherManager: launcherManager,
    facilityManager: facilityManager,
    monsterManager: monsterManager,
    projectileManager: projectileManager,
    mapManager: mapManager,
    transformableManagers: [launcherManager, facilityManager, monsterManager, projectileManager, mapManager],
  };
  return totalScreenManager;
}
