import { useEffect, useRef, useState } from "react";
import { MonsterManager } from "../../util/monster/monsterManager";
import launcherLoader from "../../util/launcher/launcherLoader";
import launcherInfo from "../../util/launcher/launcherInfo";
import { LauncherManager } from "../../util/launcher/launcherManager";
import launcherDrawer from "../../util/launcher/launcherDrawer";
import "../../assets/css/canvasStyle.css";
import { ProjectileManager } from "../../util/projectile/projectileManager";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import { ObjectDrawer } from "../../util/objectDrawer";
import { timeStamp } from "console";
import projectileInfo from "../../util/projectile/projectileInfo";
import { ProjectileFrame, getProjectileFrame } from "../../util/projectile/projectileFrame";
import { objectType } from "../../util/objectInfo";

type shootScreenProps = {
  launcherRef: LauncherManager;
  projectileRef: ProjectileManager;
  monsterRef: MonsterManager;
};

const ShootScreen = ({ launcherRef, monsterRef, projectileRef }: shootScreenProps) => {
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

  function setLauncherAngleTimer() {
    function handleLauncherAngle() {
      launcherDrawer.draw(canvasRef.current, contextRef.current, launcherRef.objects, monsterRef, true);
    }
    const launcher = launcherLoader.loadFrames(launcherInfo.lv1);
    if (launcher) launcherRef.objects.push(launcher);
    animate(launcherRef.animationFrame, handleLauncherAngle);
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = canvas.width * 0.5;

    const context = canvas.getContext("2d");
    if (context) {
      contextRef.current = context;
    }

    const windowResize = () => {
      console.log("resize : redraw launcher");
      canvas.width = window.innerWidth;
      canvas.height = canvas.width * 0.5;
      launcherDrawer.draw(canvas, context, launcherRef, monsterRef, false);
    };
    window.addEventListener("resize", windowResize);
    setLauncherAngleTimer();
    return () => {
      const [animationFrame, generationFrame] = [launcherRef.animationFrame, launcherRef.generationFrame];
      if (generationFrame && generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <div className="shootScreen">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ShootScreen;
