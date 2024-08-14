import { useEffect, useRef } from "react";
import style from "../../assets/css/gameScreen.module.css";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import LauncherElementHandler from "../../util/launcher/launcherElementHandler";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { TotalScreenManager } from "../../util/totalScreenManager";

type LauncherScreenProps = {
  totalScreenManager: TotalScreenManager | undefined;
  selectedComponent: SelectedComponent | null;
};

const LauncherScreen = ({ totalScreenManager, selectedComponent }: LauncherScreenProps) => {
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
      const { canvasRef, contextRef } = totalScreenManager.launcherManager.manager;
      if (!canvasRef || !canvasRef.current) return;
      // set canvas
      const canvas = canvasRef.current;
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
      // set context
      const context = canvas.getContext("2d");
      if (context) {
        contextRef.current = context;
      }
    }
    setCanvasAndContext();
    setLauncherAngleTimer();
    return () => {
      if (!totalScreenManager) return;
      const { animationFrame } = totalScreenManager.launcherManager.manager;
      if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame);
    };
  }, []);

  return (
    <div className={`${style.gameScreen}`}>
      {totalScreenManager && <canvas ref={totalScreenManager.launcherManager.manager.canvasRef}></canvas>}
    </div>
  );
};

export default LauncherScreen;
