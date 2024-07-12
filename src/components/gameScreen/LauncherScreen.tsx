import { useEffect, useRef } from "react";
import { MonsterManager } from "../../util/monster/monsterManager";
import launcherInfo, { LauncherInfo } from "../../util/launcher/launcherInfo";
import { LauncherManager } from "../../util/launcher/launcherManager";
import style from "../../assets/css/gameScreen.module.css";
import { ProjectileManager } from "../../util/projectile/projectileManager";
import { AnimationFrameInfo } from "../../util/object/animationFrameInfo";
import { MapManager } from "../../util/map/mapManager";
import LauncherElementHandler from "../../util/launcher/launcherElementHandler";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import mapDrawer from "../../util/map/mapCoordConverter";
import mapElementInfo from "../../util/map/mapElementInfo";
import { handleCanvasClickEvent } from "../../util/canvasClickEvent";
import { CanvasManager } from "../../util/object/CanvasManager";

type shootScreenProps = {
  launcherRef: React.MutableRefObject<LauncherManager>;
  monsterRef: React.MutableRefObject<MonsterManager>;
  mapManager: React.MutableRefObject<MapManager>;
  selectedComponent: React.MutableRefObject<SelectedComponent | null>;
};

const ShootScreen = ({ launcherRef, monsterRef, selectedComponent, mapManager }: shootScreenProps) => {
  const [canvasRef, contextRef] = [launcherRef.current.canvasRef, launcherRef.current.contextRef];
  const launcherHandler = new LauncherElementHandler(mapManager.current);
  const lastUpdatedBlockSize = useRef<number>(0);

  function animate(animation: AnimationFrameInfo, callback: Function) {
    const step = (timeStamp: number) => {
      const { interval, lastFrameTime } = animation;
      if (timeStamp - lastFrameTime > interval) {
        animation.lastFrameTime = timeStamp;
        callback();
      }
      if (animation) animation.animationFrame = requestAnimationFrame(step);
    };
    animation.animationFrame = requestAnimationFrame(step);
  }

  function setLauncherAngleTimer() {
    function handleLauncherAngle() {
      launcherHandler.draw(canvasRef.current, contextRef.current, launcherRef.current.launchers, monsterRef.current, true);
    }

    // const launcher = launcherHandler.loadFrames(launcherInfo.lv1, 7, 6);
    // if (launcher) launcherRef.objects.push(launcher);
    animate(launcherRef.current.animationFrame, handleLauncherAngle);
  }

  useEffect(() => {
    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
    }

    const windowResize = () => {
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
      launcherHandler.draw(canvas, context, launcherRef.current.launchers, monsterRef.current, false);
    };

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    setCanvasSize();
    const context = canvas.getContext("2d");
    if (context) {
      contextRef.current = context;
    }

    window.addEventListener("resize", windowResize);
    setLauncherAngleTimer();
    return () => {
      const [animationFrame, generationFrame] = [launcherRef.current.animationFrame, launcherRef.current.generationFrame];
      if (generationFrame && generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <div className={`${style.gameScreen}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ShootScreen;
