import LauncherScreen from '../../components/game/LauncherScreen';
import MonsterScreen from '../../components/game/MonsterScreen';
import '../../assets/css/canvasStyle.css';
import { LauncherManager } from '../../util/launcher/launcherManager';
import { useEffect, useRef } from 'react';
import { MonsterManager } from '../../util/monster/monsterManager';
import { ProjectileManager } from '../../util/projectile/projectileManager';
import ProjectileScreen from '../../components/game/ProjectileScreen';
import monsterDrawer from '../../util/monster/monsterDrawer';
import MapScreen from '../../components/game/mapScreen';

const GamePage = () => {
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
    objects: [],
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
    objects: [],
  });

  const monsterRef = useRef<MonsterManager>({
    animationFrame: {
      lastFrameTime: 0,
      interval: 500,
      animationFrame: null,
    },
    generationFrame: {
      lastFrameTime: 0,
      interval: 1000,
      animationFrame: null,
    },
    objects: [],
  });

  return (
    <div className="gamePage">
      <div>game page</div>
      <LauncherScreen
        launcherRef={launcherRef.current}
        monsterRef={monsterRef.current}
        projectileRef={projectileRef.current}
      />
      <MonsterScreen monsterRef={monsterRef.current} />
      <ProjectileScreen
        monsterRef={monsterRef.current}
        projectileRef={projectileRef.current}
        launcherRef={launcherRef.current}
      />
      <MapScreen />
    </div>
  );
};

export default GamePage;
