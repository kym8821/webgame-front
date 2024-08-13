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
import facilityInfo, { FacilityInfo } from "../../util/facility/facilityInfo";
import { Resource } from "../../util/resource";
import GameScreenTopBar from "../../components/topbar/gameScreenTopBar";
import GameOverModal from "../../components/modal/GameOverModal";
import FacilityElementHandler from "../../util/facility/facilityElementHandler";
import { TotalScreenManager } from "../../util/totalScreenManager";
import { loadTotalScreenManager } from "../../api/gamePageApi";

export interface SelectedComponent {
  component: MapElementInfo | LauncherInfo | FacilityInfo | null;
  type: number;
}

const GamePage = () => {
  // const selectedComponent = useRef<SelectedComponent | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [page, setPage] = useState<number>(1);
  const [minPage, maxPage] = [1, 3];
  const totalScreenManagerRef = useRef<TotalScreenManager>();
  const [resource, setResource] = useState<Resource>({
    energy: 20,
    energyOutput: facilityInfo.core.energyOutput,
    evolveFactor: 20,
    evolveFactorOutput: facilityInfo.core.evolveFactorOutput,
    health: 100,
  });

  function resetGame() {
    const facilityElementHandler = new FacilityElementHandler(mapManager.current);

    projectileRef.current.projectiles.splice(0, projectileRef.current.projectiles.length);
    launcherRef.current.launchers.splice(0, launcherRef.current.launchers.length);
    monsterRef.current.monsters.splice(0, monsterRef.current.monsters.length);
    facilityManager.current.facilities.splice(0, facilityManager.current.facilities.length);

    if (facilityManager.current.facilities.length === 0)
      facilityManager.current.facilities.push(facilityElementHandler.loadFrames(facilityInfo.core, 14, 2));
    facilityElementHandler.draw(facilityManager.current);

    setResource(() => ({
      energy: 20,
      energyOutput: facilityInfo.core.energyOutput,
      evolveFactor: 20,
      evolveFactorOutput: facilityInfo.core.evolveFactorOutput,
      health: 100,
    }));
  }

  useEffect(() => {
    resetGame();
    loadTotalScreenManager(totalScreenManagerRef);
  }, []);

  return (
    <div className={style.gamePage}>
      {resource.health <= 0 && <GameOverModal setResource={setResource} resetGame={resetGame} />}
      <GameScreenTopBar resource={resource} mapManager={mapManager} />
      <div>
        <UserInterfaceScreen
          userScreenManager={userScreenManager}
          launcherRef={launcherRef}
          monsterRef={monsterRef}
          projectileRef={projectileRef}
          selectedComponent={selectedComponent}
          mapManager={mapManager}
          facilityManager={facilityManager}
          resource={resource}
          setResource={setResource}
        />
        <LauncherScreen launcherRef={launcherRef} monsterRef={monsterRef} selectedComponent={selectedComponent} mapManager={mapManager} />
        <MonsterScreen monsterRef={monsterRef} mapManager={mapManager} setResource={setResource} />
        <ProjectileScreen
          monsterRef={monsterRef}
          projectileRef={projectileRef}
          launcherRef={launcherRef}
          mapManager={mapManager}
          resource={resource}
          setResource={setResource}
        />
        <MapScreen page={page} selectedComponent={selectedComponent} mapManager={mapManager} />
        <FacilityScreen
          facilityManager={facilityManager}
          page={page}
          mapMananger={mapManager}
          selectedComponent={selectedComponent}
          setResource={setResource}
          resource={resource}
        />
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
