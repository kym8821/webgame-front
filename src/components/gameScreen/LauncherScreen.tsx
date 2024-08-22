import { useEffect, useRef } from "react";
import style from "../../assets/css/gameScreen.module.css";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import LauncherElementHandler from "../../util/launcher/launcherElementHandler";
import { TotalScreenManager } from "../../util/totalScreenManager";
import launcherInfo from "../../util/launcher/launcherInfo";
import { TotalElementHandler } from "../../util/totalElementHandler";
import { SelectedComponent } from "../../util/SelectedComponent";

type LauncherScreenProps = {
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
  selectedComponent: SelectedComponent | null;
};

const LauncherScreen = ({ totalScreenManager, selectedComponent }: LauncherScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  let launcherHandler: LauncherElementHandler | null = null;
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
    if (!totalScreenManager) return;
    function handleLauncherAngle() {
      if (!totalScreenManager || !launcherHandler) return;
      launcherHandler.drawNext(totalScreenManager.monsterManager.manager.objects);
    }
    const launcherManager = totalScreenManager.launcherManager.manager;
    animate(launcherManager.animationFrame, handleLauncherAngle);
  }

  useEffect(() => {
    function setCanvasAndContext() {
      if (!totalScreenManager) return;
      // set canvas
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
      // set context
      const context = canvasRef.current.getContext("2d");
      if (!context) return;
      contextRef.current = context;
      totalScreenManager.launcherManager.manager.canvasRef = canvasRef;
      totalScreenManager.launcherManager.manager.contextRef = contextRef;
    }
    setCanvasAndContext();
    setLauncherAngleTimer();
    return () => {
      if (!totalScreenManager) return;
      const { animationFrame } = totalScreenManager.launcherManager.manager;
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, [totalScreenManager, canvasRef, contextRef, launcherInfo]);

  return (
    <div className={`${style.gameScreen}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default LauncherScreen;
