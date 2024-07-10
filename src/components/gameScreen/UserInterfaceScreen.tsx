import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { LauncherManager } from "../../util/launcher/launcherManager";
import { CanvasManager } from "../../util/object/CanvasManager";
import { MapManager } from "../../util/map/mapManager";
import { MonsterManager } from "../../util/monster/monsterManager";
import { ProjectileManager } from "../../util/projectile/projectileManager";
import { useEffect } from "react";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import style from "../../assets/css/gameScreen.module.css";

interface UserInterfaceScreen {
  userScreenManager: React.MutableRefObject<CanvasManager>;
  launcherRef: React.MutableRefObject<LauncherManager>;
  monsterRef: React.MutableRefObject<MonsterManager>;
  projectileRef: React.MutableRefObject<ProjectileManager>;
  selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  mapManager: React.MutableRefObject<MapManager>;
}

const UserInterfaceScreen = ({
  userScreenManager,
  launcherRef,
  monsterRef,
  projectileRef,
  selectedComponent,
  mapManager,
}: UserInterfaceScreen) => {
  const [canvasRef, contextRef] = [userScreenManager.current.canvasRef, userScreenManager.current.contextRef];

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
    canvas.onclick = (e: MouseEvent) => handleCanvasClickEvent(e, selectedComponent, launcherRef, monsterRef, mapManager);

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
