import { ProjectileManager } from "../../util/projectile/projectileManager";
import style from "../../assets/css/gameScreen.module.css";
import { useEffect, useRef } from "react";
import { AnimationFrameInfo } from "../../util/object/animationFrameInfo";
import { LauncherManager } from "../../util/launcher/launcherManager";
import projectileInfo, { getProjectileInfoById } from "../../util/projectile/projectileInfo";
import { MonsterManager } from "../../util/monster/monsterManager";
import { MapManager } from "../../util/map/mapManager";
import ProjectileElementHandler from "../../util/projectile/projectileElementHandler";
import { getCurrentBlockSize } from "../../util/windowSize";
import { Resource } from "../../util/resource";

interface ProjectileScreenProps {
  projectileRef: React.MutableRefObject<ProjectileManager>;
  launcherRef: React.MutableRefObject<LauncherManager>;
  monsterRef: React.MutableRefObject<MonsterManager>;
  mapManager: React.MutableRefObject<MapManager>;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const ProjectileScreen = ({ projectileRef, launcherRef, monsterRef, mapManager, resource, setResource }: ProjectileScreenProps) => {
  const [canvasRef, contextRef] = [projectileRef.current.canvasRef, projectileRef.current.contextRef];
  const projectileHandler = new ProjectileElementHandler(mapManager.current);
  const lastUpdatedBlockSize = useRef<number>(0);
  const resourceRef = useRef<Resource>(resource);

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
      projectileHandler.draw(canvasRef.current, contextRef.current, projectileRef.current.projectiles, monsterRef.current.monsters, true);
    }
    animate(projectileRef.current.animationFrame, animateProjectile);
  }

  function setProjectileGenerateTimer() {
    function generateProjectile() {
      if (monsterRef.current.monsters.length === 0) return;
      const launchers = launcherRef.current.launchers;
      let updatedEnergy = resourceRef.current.energy;
      // console.log(updatedEnergy);
      launchers.forEach((launcher) => {
        const projectileId = launcher.projectileId;
        const projectileInfo = getProjectileInfoById(projectileId);
        if (
          updatedEnergy >= launcher.info.shootCost &&
          mapManager.current.map[launcher.mapStartY][launcher.mapStartX].activate &&
          canvasRef.current &&
          projectileInfo
        ) {
          const projectileFrame = projectileHandler.loadFrames(canvasRef.current, projectileInfo, launcher);
          if (projectileFrame) projectileRef.current.projectiles.push(projectileFrame);
          updatedEnergy -= launcher.info.shootCost;
        }
      });
      setResource((prev) => ({
        ...prev,
        energy: updatedEnergy,
      }));
    }
    if (launcherRef.current.generationFrame) animate(launcherRef.current.generationFrame, generateProjectile);
  }

  useEffect(() => {
    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
    }

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    setCanvasSize();

    const context = canvas.getContext("2d");
    if (context) contextRef.current = context;
    resourceRef.current = resource;
    setProjectileGenerateTimer();
    setProjectileAnimateTimer();
    return () => {
      const [animationFrame, generationFrame] = [projectileRef.current.animationFrame, projectileRef.current.generationFrame];
      if (generationFrame && generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, [resource]);

  return (
    <div className={style.gameScreen}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ProjectileScreen;
