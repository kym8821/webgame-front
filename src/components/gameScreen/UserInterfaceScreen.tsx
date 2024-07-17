import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { LauncherManager } from "../../util/launcher/launcherManager";
import { CanvasManager } from "../../util/object/CanvasManager";
import { MapManager } from "../../util/map/mapManager";
import { MonsterManager } from "../../util/monster/monsterManager";
import { ProjectileManager } from "../../util/projectile/projectileManager";
import { useEffect, useRef } from "react";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import style from "../../assets/css/gameScreen.module.css";
import { CanvasObjectManager } from "../../util/object/canvasObjectManager";
import MonsterElementHandler from "../../util/monster/monsterElementHandler";
import ProjectileElementHandler from "../../util/projectile/projectileElementHandler";
import LauncherElementHandler from "../../util/launcher/launcherElementHandler";
import { getCurrentBlockSize } from "../../util/windowSize";
import MapElementHandler from "../../util/map/mapElementHandler";
import { FacilityManager } from "../../util/facility/facilityManager";
import FacilityElementHandler from "../../util/facility/facilityElementHandler";
import { Resource } from "../../util/resource";

interface UserInterfaceScreen {
  userScreenManager: React.MutableRefObject<CanvasManager>;
  launcherRef: React.MutableRefObject<LauncherManager>;
  monsterRef: React.MutableRefObject<MonsterManager>;
  projectileRef: React.MutableRefObject<ProjectileManager>;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  mapManager: React.MutableRefObject<MapManager>;
  facilityManager: React.MutableRefObject<FacilityManager>;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const UserInterfaceScreen = ({
  userScreenManager,
  launcherRef,
  monsterRef,
  projectileRef,
  selectedComponent,
  mapManager,
  facilityManager,
  resource,
  setResource,
}: UserInterfaceScreen) => {
  const [canvasRef, contextRef] = [userScreenManager.current.canvasRef, userScreenManager.current.contextRef];
  const lastUpdatedBlockSize = useRef<number>(0);

  useEffect(() => {
    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvasSize();
    canvas.onresize = setCanvasSize;
    canvas.onclick = (e: MouseEvent) =>
      handleCanvasClickEvent(e, selectedComponent, launcherRef, monsterRef, mapManager, facilityManager, resource, setResource);

    const monsterHandler = new MonsterElementHandler(mapManager.current);
    const projectileHandler = new ProjectileElementHandler(mapManager.current);
    const launcherHandler = new LauncherElementHandler(mapManager.current);
    const mapHandler = new MapElementHandler(mapManager.current);
    const facilityHandler = new FacilityElementHandler(mapManager.current);
    window.addEventListener("resize", () => {
      function resizeScreen(manager: CanvasObjectManager | CanvasManager) {
        const [canvas, context] = [manager.canvasRef.current, manager.contextRef.current];
        if (!canvas || !context) return;
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.width / 2;
      }
      const currentBlockSize = getCurrentBlockSize(canvas.scrollWidth, mapManager.current.numberMap);
      if (currentBlockSize && currentBlockSize > lastUpdatedBlockSize.current * 2 && context) {
        // const [monsterCanvas, monsterContext] = [monsterRef.current.canvasRef.current, monsterRef.current.contextRef.current];
        // const [launcherCanvas, launcherContext] = [launcherRef.current.canvasRef.current, launcherRef.current.contextRef.current];
        // const [projectileCanvas, projectileContext] = [projectileRef.current.canvasRef.current, projectileRef.current.contextRef.current];
        const [mapCanvas, mapContext] = [mapManager.current.canvasRef.current, mapManager.current.contextRef.current];
        resizeScreen(monsterRef.current);
        resizeScreen(launcherRef.current);
        resizeScreen(projectileRef.current);
        resizeScreen(mapManager.current);
        resizeScreen(facilityManager.current);
        mapManager.current.blockSize = currentBlockSize;
        // if (launcherCanvas && launcherContext)
        //   launcherHandler.draw(launcherCanvas, launcherContext, launcherRef.current.launchers, monsterRef.current, false);
        // if (monsterCanvas && monsterContext) monsterHandler.animate(launcherCanvas, launcherContext, monsterRef.current.monsters, false);
        // if (projectileCanvas && projectileContext)
        //   projectileHandler.draw(launcherCanvas, launcherContext, projectileRef.current.projectiles, monsterRef.current.monsters, false);
        if (mapContext) mapHandler.draw(mapContext);
        facilityHandler.draw(facilityManager.current);

        lastUpdatedBlockSize.current = mapManager.current.blockSize;
      }
    });
    const context = canvas.getContext("2d");
    if (context) {
      contextRef.current = context;
    }
  });

  return (
    <div className={`${style.gameScreen} ${style.clickEventScreen}`} style={{ zIndex: 10 }}>
      <canvas ref={userScreenManager.current.canvasRef}></canvas>
    </div>
  );
};

export default UserInterfaceScreen;
