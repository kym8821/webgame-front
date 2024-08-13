import { useRef } from "react";
import { FacilityManager, FacilityManagerClass } from "../util/facility/facilityManager";
import { LauncherManager, LauncherManagerClass } from "../util/launcher/launcherManager";
import { MapManager, MapManagerClass } from "../util/map/mapManager";
import { MonsterManager, MonsterManagerClass } from "../util/monster/monsterManager";
import { CanvasManager } from "../util/object/CanvasManager";
import { ProjectileManager, ProjectileManagerClass } from "../util/projectile/projectileManager";
import { TotalScreenManager } from "../util/totalScreenManager";

export async function loadTotalScreenManager(totalScreenManagerRef: React.MutableRefObject<TotalScreenManager | undefined>) {
  const userScreenManager: CanvasManager = {
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  };
  const monsterManager: MonsterManager = {
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
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  };
  const projectileManager: ProjectileManager = {
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
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  };
  const mapManager: MapManager = {
    numberMap: [],
    blockSize: window.innerWidth / 20,
    map: [[]],
    objects: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  };
  const facilityManager: FacilityManager = {
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
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  };
  const launcherManager: LauncherManager = {
    animationFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    objects: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  };
  const totalScreenManager: TotalScreenManager = {
    userScreenManager: userScreenManager,
    launcherManager: new LauncherManagerClass(launcherManager),
    facilityManager: new FacilityManagerClass(facilityManager),
    monsterManager: new MonsterManagerClass(monsterManager),
    projectileManager: new ProjectileManagerClass(projectileManager),
    mapManager: new MapManagerClass(mapManager),
  };
  totalScreenManagerRef.current = totalScreenManager;
}
