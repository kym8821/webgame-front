import LauncherScreen from '../../components/gameScreen/LauncherScreen';
import MonsterScreen from '../../components/gameScreen/MonsterScreen';
import style from '../../assets/css/gameScreen.module.css';
import { useEffect, useRef, useState } from 'react';
import ProjectileScreen from '../../components/gameScreen/ProjectileScreen';
import MapScreen from '../../components/gameScreen/MapScreen';
import GameObjectFooter from '../../components/footer/GameObjectFooter';
import UserInterfaceScreen from '../../components/gameScreen/UserInterfaceScreen';
import GameObjectSideBar from '../../components/sideBar/GameObjectSibeBar';
import facilityInfo from '../../util/facility/facilityInfo';
import { Resource } from '../../util/resource';
import GameScreenTopBar from '../../components/topbar/gameScreenTopBar';
import GameOverModal from '../../components/modal/GameOverModal';
import FacilityElementHandler from '../../util/facility/facilityElementHandler';
import { TotalScreenManager } from '../../util/totalScreenManager';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { loadObjectInfoImages } from '../../loader/imageLoader';
import { loadTotalScreenManager } from '../../loader/managerLoader';
import { loadTotalElementHandler } from '../../loader/elementHandlerLoader,';
import { SelectedComponent } from '../../util/SelectedComponent';
import FacilityScreen from '../../components/gameScreen/FacilityScreen';

const GamePage = () => {
  // const selectedComponent = useRef<SelectedComponent | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [page, setPage] = useState<number>(1);
  const [minPage, maxPage] = [1, 3];
  const totalScreenManager = useRef<TotalScreenManager | undefined>(undefined);
  const totalElementHandler = useRef<TotalElementHandler | undefined>(undefined);
  const [resource, setResource] = useState<Resource>({
    energy: 20,
    energyOutput: facilityInfo.core.energyOutput,
    evolveFactor: 20,
    evolveFactorOutput: facilityInfo.core.evolveFactorOutput,
    health: 100,
  });

  function resetGame() {
    if (!totalScreenManager.current || !totalElementHandler.current) return;
    totalElementHandler.current.redrawScreenLists.forEach((handler) => {
      handler.reset();
    });
    setResource(() => ({
      energy: 20,
      energyOutput: facilityInfo.core.energyOutput,
      evolveFactor: 20,
      evolveFactorOutput: facilityInfo.core.evolveFactorOutput,
      health: 10000,
    }));
  }

  useEffect(() => {
    const _totalScreenManager = loadTotalScreenManager();
    totalScreenManager.current = _totalScreenManager;
    totalElementHandler.current = loadTotalElementHandler(_totalScreenManager);
    loadObjectInfoImages(totalElementHandler.current);
    resetGame();
  }, []);

  return (
    <div className={style.gamePage}>
      {resource.health <= 0 && <GameOverModal setResource={setResource} resetGame={resetGame} />}
      {totalScreenManager.current && (
        <GameScreenTopBar resource={resource} mapManager={totalScreenManager.current.mapManager} />
      )}
      <div>
        <UserInterfaceScreen
          totalScreenManager={totalScreenManager.current}
          totalElementHandler={totalElementHandler.current}
          selectedComponent={selectedComponent}
          resource={resource}
          setResource={setResource}
        />
        <LauncherScreen
          totalElementHandler={totalElementHandler.current}
          totalScreenManager={totalScreenManager.current}
          selectedComponent={selectedComponent}
        />
        <MonsterScreen
          totalScreenManager={totalScreenManager.current}
          totalElementHandler={totalElementHandler.current}
          setResource={setResource}
        />
        <ProjectileScreen
          totalElementHandler={totalElementHandler.current}
          totalScreenManager={totalScreenManager.current}
          resource={resource}
          setResource={setResource}
        />
        <MapScreen
          page={page}
          totalElementHandler={totalElementHandler.current}
          selectedComponent={selectedComponent}
          totalScreenManager={totalScreenManager.current}
        />
        <FacilityScreen
          totalElementHandler={totalElementHandler.current}
          totalScreenManager={totalScreenManager.current}
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
