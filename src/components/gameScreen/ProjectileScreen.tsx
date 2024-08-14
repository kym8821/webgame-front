import style from "../../assets/css/gameScreen.module.css";
import { useEffect } from "react";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import { getProjectileInfoById } from "../../util/projectile/projectileInfo";
import ProjectileElementHandler from "../../util/projectile/projectileElementHandler";
import { Resource } from "../../util/resource";
import { TotalScreenManager } from "../../util/totalScreenManager";
import { ProjectileFrameClass } from "../../util/projectile/projectileFrame";

interface ProjectileScreenProps {
  totalScreenManager: TotalScreenManager | undefined;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const ProjectileScreen = ({ totalScreenManager, resource, setResource }: ProjectileScreenProps) => {
  const projectileHandler: ProjectileElementHandler | null = null;

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
    if (!totalScreenManager) return;
    const projectileManager = totalScreenManager.projectileManager;
    function animateProjectile() {
      if (!projectileHandler || !totalScreenManager) return;
      const monsters = totalScreenManager.monsterManager.manager.objects;
      projectileHandler.drawNext(monsters);
    }
    animate(projectileManager.manager.animationFrame, animateProjectile);
  }

  function setProjectileGenerateTimer() {
    if (!totalScreenManager) return;
    const projectileManager = totalScreenManager.projectileManager;
    const monsters = totalScreenManager.monsterManager.manager.objects;
    const launchers = totalScreenManager.launcherManager.manager.objects;
    const mapManager = totalScreenManager.mapManager.manager;
    function generateProjectile() {
      if (!projectileHandler || !totalScreenManager) return;
      if (monsters.length === 0) return;
      const canvas = projectileHandler.manager.canvasRef.current;
      if (!canvas) return;
      let updatedEnergy = resource.energy;
      launchers.forEach((launcherFrameClass) => {
        const launcher = launcherFrameClass.frame;
        const projectileId = launcher.projectileId;
        const projectileInfo = getProjectileInfoById(projectileId);
        if (
          updatedEnergy >= launcher.info.shootCost &&
          mapManager.map[launcher.mapPointY][launcher.mapPointX].frame.activate &&
          projectileInfo
        ) {
          const projectileFrame = ProjectileFrameClass.loadFrame(projectileInfo, launcher);
          if (projectileFrame) projectileManager.manager.objects.push(projectileFrame);
          updatedEnergy -= launcher.info.shootCost;
        }
      });
      setResource((prev) => ({
        ...prev,
        energy: updatedEnergy,
      }));
    }
    if (projectileManager.manager.generationFrame) animate(projectileManager.manager.generationFrame, generateProjectile);
  }

  useEffect(() => {
    if (!totalScreenManager) return;
    const { canvasRef, contextRef } = totalScreenManager.projectileManager.manager;
    // set canvas
    if (!canvasRef.current) return;
    canvasRef.current.width = canvasRef.current.scrollWidth;
    canvasRef.current.height = canvasRef.current.width / 2;
    // set context
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    contextRef.current = context;
    // set facilityElementHandler
    const mapManager = totalScreenManager.mapManager.manager;
    const projectileManager = totalScreenManager.projectileManager.manager;
    const projectileElementHandler = new ProjectileElementHandler(projectileManager, mapManager);
    projectileElementHandler.reDraw();
    // set animation frame
    setProjectileGenerateTimer();
    setProjectileAnimateTimer();
    return () => {
      const { animationFrame, generationFrame } = projectileManager;
      if (generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, [totalScreenManager, resource]);

  return (
    <div className={style.gameScreen}>
      {totalScreenManager && <canvas ref={totalScreenManager.projectileManager.manager.canvasRef}></canvas>}
    </div>
  );
};

export default ProjectileScreen;
