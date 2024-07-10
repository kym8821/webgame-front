import { ProjectileManager } from "../../util/projectile/projectileManager";
import style from "../../assets/css/gameScreen.module.css";
import { useEffect, useRef } from "react";
import { AnimationFrameInfo } from "../../util/object/animationFrameInfo";
import { LauncherManager } from "../../util/launcher/launcherManager";
import projectileInfo from "../../util/projectile/projectileInfo";
import { MonsterManager } from "../../util/monster/monsterManager";
import { MapManager } from "../../util/map/mapManager";
import ProjectileElementHandler from "../../util/projectile/projectileElementHandler";
import { getCurrentBlockSize } from "../../util/windowSize";

interface ProjectileScreenProps {
  projectileRef: React.MutableRefObject<ProjectileManager>;
  launcherRef: React.MutableRefObject<LauncherManager>;
  monsterRef: React.MutableRefObject<MonsterManager>;
  mapManager: React.MutableRefObject<MapManager>;
}

const ProjectileScreen = ({ projectileRef, launcherRef, monsterRef, mapManager }: ProjectileScreenProps) => {
  const [canvasRef, contextRef] = [projectileRef.current.canvasRef, projectileRef.current.contextRef];
  const projectileHandler = new ProjectileElementHandler(mapManager.current);
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

  function setProjectileAnimateTimer() {
    function animateProjectile() {
      projectileHandler.draw(canvasRef.current, contextRef.current, projectileRef.current.objects, monsterRef.current.objects, true);
    }
    animate(projectileRef.current.animationFrame, animateProjectile);
  }

  function setProjectileGenerateTimer() {
    function generateProjectile() {
      if (monsterRef.current.objects.length === 0) return;
      const launchers = launcherRef.current.objects;
      launchers.forEach((launcher) => {
        const projectileId = launcher.info.projectileId;
        if (!(projectileId in projectileInfo) || !canvasRef.current) {
          alert("invalid projectile id or canvas object");
          return;
        }
        const projectile = projectileInfo[projectileId];
        const projectileFrame = projectileHandler.loadFrames(canvasRef.current, projectile, launcher);
        if (projectileFrame) projectileRef.current.objects.push(projectileFrame);
      });
    }
    if (launcherRef.current.generationFrame) animate(launcherRef.current.generationFrame, generateProjectile);
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
      projectileHandler.draw(canvas, context, projectileRef.current.objects, monsterRef.current.objects, false);
      // if (mapInfo.blockSize > lastUpdatedBlockSize.current * 2 && context) {
      //   lastUpdatedBlockSize.current = mapInfo.blockSize;
      //   projectileHandler.draw(canvas, context, projectileRef.objects, monsterRef.objects, false);
      // }
    };

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    setCanvasSize();

    const context = canvas.getContext("2d");
    if (context) contextRef.current = context;

    setProjectileAnimateTimer();
    setProjectileGenerateTimer();
    window.addEventListener("resize", windowResize);
    return () => {
      const [animationFrame, generationFrame] = [projectileRef.current.animationFrame, projectileRef.current.generationFrame];
      if (generationFrame && generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, []);

  return (
    <div className={style.gameScreen}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ProjectileScreen;
