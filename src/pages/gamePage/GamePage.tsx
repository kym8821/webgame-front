import LauncherScreen from "../../components/gameScreen/LauncherScreen";
import MonsterScreen from "../../components/gameScreen/MonsterScreen";
import style from "../../assets/css/gameScreen.module.css";
import { LauncherManager } from "../../util/launcher/launcherManager";
import { useEffect, useRef, useState } from "react";
import { MonsterManager } from "../../util/monster/monsterManager";
import { ProjectileManager } from "../../util/projectile/projectileManager";
import ProjectileScreen from "../../components/gameScreen/ProjectileScreen";
import MapScreen from "../../components/gameScreen/MapScreen";
import { MapInfo } from "../../util/map/mapInfo";
import GameScreenFooter from "../../components/footer/GameScreenFooter";
import GameObjectFooter from "../../components/footer/GameObjectFooter";
import { MapElementInfo } from "../../util/map/mapElementInfo";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import { MapCanvasManager } from "../../util/map/mapCanvasManager";

export interface SelectedComponent {
  component: MapElementInfo | LauncherInfo | null;
  type: number;
}

const GamePage = () => {
  const [modal, setModal] = useState(<div></div>);
  const selectedComponent = useRef<SelectedComponent | null>(null);
  const [page, setPage] = useState<number>(1);
  const [minPage, maxPage] = [1, 2];

  const mapInfo = useRef<MapInfo>({
    blockSize: window.innerWidth / 20,
    map: [[]],
  });

  const mapManager = useRef<MapCanvasManager>({
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
    objects: [],
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
    objects: [],
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
    objects: [],
    canvasRef: useRef<HTMLCanvasElement>(null),
    contextRef: useRef<CanvasRenderingContext2D>(null),
  });

  return (
    <div className={style.gamePage}>
      {selectedComponent.current && <div>{selectedComponent.current.type}</div>}
      <div>{modal}</div>
      <div>
        <LauncherScreen
          launcherRef={launcherRef}
          monsterRef={monsterRef}
          mapInfo={mapInfo}
          selectedComponent={selectedComponent}
          mapManager={mapManager}
        />
        <MonsterScreen monsterRef={monsterRef} mapInfo={mapInfo.current} />
        <ProjectileScreen monsterRef={monsterRef} projectileRef={projectileRef} launcherRef={launcherRef} mapInfo={mapInfo.current} />
        <MapScreen mapInfo={mapInfo.current} page={page} selectedComponent={selectedComponent} mapManager={mapManager} />
      </div>
      {/* <GameScreenFooter setModal={setModal} mapInfo={mapInfo.current} /> */}
      <GameObjectFooter page={page} setPage={setPage} minPage={minPage} maxPage={maxPage} selectedComponent={selectedComponent} />
    </div>
  );
};

export default GamePage;
