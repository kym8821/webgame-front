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

export interface SelectedComponent {
  component: MapElementInfo | LauncherInfo | null;
  type: number;
}

const GamePage = () => {
  const [modal, setModal] = useState(<div></div>);
  const selectedComponent = useRef<SelectedComponent | null>(null);
  const [page, setPage] = useState<number>(1);
  const [minPage, maxPage] = [1, 2];

  const userScreenManager = useRef<CanvasManager>({
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  const mapManager = useRef<MapManager>({
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
      <div>{modal}</div>
      <div>
        <UserInterfaceScreen
          userScreenManager={userScreenManager}
          launcherRef={launcherRef}
          monsterRef={monsterRef}
          projectileRef={projectileRef}
          selectedComponent={selectedComponent}
          mapManager={mapManager}
        />
        <LauncherScreen launcherRef={launcherRef} monsterRef={monsterRef} selectedComponent={selectedComponent} mapManager={mapManager} />
        <MonsterScreen monsterRef={monsterRef} mapManager={mapManager} />
        <ProjectileScreen monsterRef={monsterRef} projectileRef={projectileRef} launcherRef={launcherRef} mapManager={mapManager} />
        <MapScreen page={page} selectedComponent={selectedComponent} mapManager={mapManager} />
      </div>
      <GameObjectFooter page={page} setPage={setPage} minPage={minPage} maxPage={maxPage} selectedComponent={selectedComponent} />
    </div>
  );
};

export default GamePage;
