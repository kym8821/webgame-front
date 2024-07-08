import { ProjectileManager } from '../../util/projectile/projectileManager';
import '../../assets/css/canvasStyle.css';
import { useEffect, useRef } from 'react';
import projectileDrawer from '../../util/projectile/projectileDrawer';
import { AnimationFrameInfo } from '../../util/animationFrameInfo';
import { LauncherManager } from '../../util/launcher/launcherManager';
import projectileInfo from '../../util/projectile/projectileInfo';
import { getProjectileFrame } from '../../util/projectile/projectileFrame';
import projectileLoader from '../../util/projectile/projectileLoader';
import { MonsterManager } from '../../util/monster/monsterManager';

interface ProjectileScreenProps {
  projectileRef: ProjectileManager;
  launcherRef: LauncherManager;
  monsterRef: MonsterManager;
}

const ProjectileScreen = ({ projectileRef, launcherRef, monsterRef }: ProjectileScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

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
      projectileDrawer.draw(canvasRef.current, contextRef.current, projectileRef.objects, monsterRef.objects, true);
    }
    animate(projectileRef.animationFrame, animateProjectile);
  }

  function setProjectileGenerateTimer() {
    function generateProjectile() {
      if (monsterRef.objects.length === 0) return;
      const launchers = launcherRef.objects;
      launchers.forEach((launcher) => {
        const projectileId = launcher.info.projectileId;
        if (!(projectileId in projectileInfo)) {
          alert('invalid projectile id');
          return;
        }
        const projectile = projectileInfo[projectileId];
        const projectileFrame = projectileLoader.loadFrames(canvasRef.current, projectile, launcher);
        projectileRef.objects.push(projectileFrame);
      });
    }
    if (launcherRef.generationFrame) animate(launcherRef.generationFrame, generateProjectile);
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = canvas.width / 2;

    const context = canvas.getContext('2d');
    if (context) contextRef.current = context;

    function windowResize() {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width / 2;
      projectileDrawer.draw(canvas, context, projectileRef.objects, monsterRef.objects, false);
    }
    setProjectileAnimateTimer();
    setProjectileGenerateTimer();
    window.addEventListener('resize', windowResize);
    return () => {
      const [animationFrame, generationFrame] = [projectileRef.animationFrame, projectileRef.generationFrame];
      if (generationFrame && generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, []);

  return (
    <div className="projectileScreen">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ProjectileScreen;
