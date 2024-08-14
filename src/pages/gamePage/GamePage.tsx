import LauncherScreen from "../../components/gameScreen/LauncherScreen";
import MonsterScreen from "../../components/gameScreen/MonsterScreen";
import style from "../../assets/css/gameScreen.module.css";
import { useEffect, useState } from "react";
import ProjectileScreen from "../../components/gameScreen/ProjectileScreen";
import MapScreen from "../../components/gameScreen/MapScreen";
import GameObjectFooter from "../../components/footer/GameObjectFooter";
import { MapElementInfo } from "../../util/map/mapElementInfo";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import UserInterfaceScreen from "../../components/gameScreen/UserInterfaceScreen";
import GameObjectSideBar from "../../components/sideBar/GameObjectSibeBar";
import FacilityScreen from "../../components/gameScreen/facilityScreen";
import facilityInfo, { FacilityInfo } from "../../util/facility/facilityInfo";
import { Resource } from "../../util/resource";
import GameScreenTopBar from "../../components/topbar/gameScreenTopBar";
import GameOverModal from "../../components/modal/GameOverModal";
import FacilityElementHandler from "../../util/facility/facilityElementHandler";
import { useTotalScreenManager } from "../../api/managerLoader";
import { useTotalElementHandler } from "../../api/elementHandlerLoader,";

export interface SelectedComponent {
  component: MapElementInfo | LauncherInfo | FacilityInfo | null;
  type: number;
}

const GamePage = () => {
  // const selectedComponent = useRef<SelectedComponent | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [page, setPage] = useState<number>(1);
  const [minPage, maxPage] = [1, 3];
  const totalScreenManager = useTotalScreenManager();
  const totalElementHandler = useTotalElementHandler(totalScreenManager);
  const [resource, setResource] = useState<Resource>({
    energy: 20,
    energyOutput: facilityInfo.core.energyOutput,
    evolveFactor: 20,
    evolveFactorOutput: facilityInfo.core.evolveFactorOutput,
    health: 100,
  });

  function resetGame() {
    if (!totalScreenManager) return;
    const mapManager = totalScreenManager.mapManager;
    const facilityManager = totalScreenManager.facilityManager;
    const facilityElementHandler = new FacilityElementHandler(facilityManager.manager, mapManager.manager);
    totalScreenManager.resetManagers.forEach((manager) => {
      manager.deleteAll();
    });
    facilityElementHandler.reDraw();
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
  }, []);

  return (
    <div className={style.gamePage}>
      {resource.health <= 0 && <GameOverModal setResource={setResource} resetGame={resetGame} />}
      {totalScreenManager && <GameScreenTopBar resource={resource} mapManager={totalScreenManager.mapManager} />}
      <div>
        <UserInterfaceScreen
          totalScreenManager={totalScreenManager}
          totalElementHandler={totalElementHandler}
          selectedComponent={selectedComponent}
          resource={resource}
          setResource={setResource}
        />
        <LauncherScreen totalScreenManager={totalScreenManager} selectedComponent={selectedComponent} />
        <MonsterScreen totalScreenManager={totalScreenManager} setResource={setResource} />
        <ProjectileScreen totalScreenManager={totalScreenManager} resource={resource} setResource={setResource} />
        <MapScreen page={page} selectedComponent={selectedComponent} totalScreenManager={totalScreenManager} />
        <FacilityScreen
          totalScreenManager={totalScreenManager}
          page={page}
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
