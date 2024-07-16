import LauncherScreen from "../../components/gameScreen/LauncherScreen";
import MonsterScreen from "../../components/gameScreen/MonsterScreen";
import style from "../../assets/css/gameScreen.module.css";
import { LauncherManager } from "../../util/launcher/launcherManager";
import { useEffect, useRef, useState } from "react";
import { MonsterManager } from "../../util/monster/monsterManager";
import { ProjectileManager } from "../../util/projectile/projectileManager";
import ProjectileScreen from "../../components/gameScreen/ProjectileScreen";
import MapScreen from "../../components/gameScreen/MapScreen";
import { MapManager } from "../../util/map/mapManager";
import GameObjectFooter from "../../components/footer/GameObjectFooter";
import { MapElementInfo } from "../../util/map/mapElementInfo";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import { CanvasManager } from "../../util/object/CanvasManager";
import UserInterfaceScreen from "../../components/gameScreen/UserInterfaceScreen";
import GameObjectSideBar from "../../components/sideBar/GameObjectSibeBar";
import { FacilityManager } from "../../util/facility/facilityManager";
import FacilityScreen from "../../components/gameScreen/facilityScreen";
import { FacilityInfo } from "../../util/facility/facilityInfo";

export interface SelectedComponent {
  component: MapElementInfo | LauncherInfo | FacilityInfo | null;
  type: number;
}

const GamePage = () => {
  // const selectedComponent = useRef<SelectedComponent | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [page, setPage] = useState<number>(1);
  const [minPage, maxPage] = [1, 3];

  const userScreenManager = useRef<CanvasManager>({
    animationFrame: {
      lastFrameTime: 0,
      interval: 20,
      animationFrame: null,
    },
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  const facilityManager = useRef<FacilityManager>({
    energy: 0,
    energyOutput: 0,
    evolveFactor: 0,
    evolveFactorOutput: 0,
    animationFrame: {
      lastFrameTime: 0,
      interval: 20,
      animationFrame: null,
    },
    facilities: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  const mapManager = useRef<MapManager>({
    animationFrame: {
      lastFrameTime: 0,
      interval: 20,
      animationFrame: null,
    },
    blockSize: window.innerWidth / 20,
    map: [[]],
    mapObjects: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  const projectileRef = useRef<ProjectileManager>({
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
    movementFrame: {
      lastFrameTime: 0,
      interval: 20,
      animationFrame: null,
    },
    projectiles: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  const launcherRef = useRef<LauncherManager>({
    animationFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    generationFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    movementFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    launchers: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  const monsterRef = useRef<MonsterManager>({
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
    monsters: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  return (
    <div className={style.gamePage}>
      <div>
        <UserInterfaceScreen
          userScreenManager={userScreenManager}
          launcherRef={launcherRef}
          monsterRef={monsterRef}
          projectileRef={projectileRef}
          selectedComponent={selectedComponent}
          mapManager={mapManager}
          facilityManager={facilityManager}
        />
        <LauncherScreen launcherRef={launcherRef} monsterRef={monsterRef} selectedComponent={selectedComponent} mapManager={mapManager} />
        <MonsterScreen monsterRef={monsterRef} mapManager={mapManager} />
        <ProjectileScreen monsterRef={monsterRef} projectileRef={projectileRef} launcherRef={launcherRef} mapManager={mapManager} />
        <MapScreen page={page} selectedComponent={selectedComponent} mapManager={mapManager} />
        <FacilityScreen facilityManager={facilityManager} page={page} mapMananger={mapManager} selectedComponent={selectedComponent} />
        <GameObjectFooter
          page={page}
          setPage={setPage}
          minPage={minPage}
          maxPage={maxPage}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      </div>
      <GameObjectSideBar selectedComponent={selectedComponent} />
    </div>
  );
};

export default GamePage;
