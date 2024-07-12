import { useEffect, useRef, useState } from "react";
import { MonsterManager } from "../../util/monster/monsterManager";
import { AnimationFrameInfo } from "../../util/object/animationFrameInfo";
import style from "../../assets/css/gameScreen.module.css";
import { MapManager } from "../../util/map/mapManager";
import MonsterElementHandler from "../../util/monster/monsterElementHandler";
import { getCurrentBlockSize } from "../../util/windowSize";

type monsterScreenProps = {
  monsterRef: React.MutableRefObject<MonsterManager>;
  mapManager: React.MutableRefObject<MapManager>;
};

const MonsterScreen = ({ monsterRef, mapManager }: monsterScreenProps) => {
  const [canvasRef, contextRef] = [monsterRef.current.canvasRef, monsterRef.current.contextRef];
  const monsterElementHandler = new MonsterElementHandler(mapManager.current);
  const lastUpdatedBlockSize = useRef<number>(0);
  const [pointer, setPointer] = useState({
    x: -1,
    y: -1,
  });

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

  function setGenerationTimer() {
    const generate = () => {
      const object = monsterElementHandler.getNextObject();
      if (object) {
        const objectFrame = monsterElementHandler.loadFrames(object, 0, 3);
        if (objectFrame) monsterRef.current.monsters.push(objectFrame);
      }
    };
    if (monsterRef.current.generationFrame) animate(monsterRef.current.generationFrame, generate);
  }

  function setAnimationTimer() {
    const animateMonster = () => {
      monsterElementHandler.animate(canvasRef.current, contextRef.current, monsterRef.current.monsters, true);
    };
    animate(monsterRef.current.animationFrame, animateMonster);
  }

  function setMovementTimer() {
    const moveMonster = () => {
      monsterElementHandler.move(canvasRef.current, contextRef.current, monsterRef.current.monsters, true);
    };
    animate(monsterRef.current.movementFrame, moveMonster);
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
      monsterElementHandler.move(canvas, context, monsterRef.current.monsters, false);
      // if (mapInfo.blockSize > lastUpdatedBlockSize.current * 2 && context) {
      //   lastUpdatedBlockSize.current = mapInfo.blockSize;
      //   monsterElementHandler.draw(canvas, context, monsterRef.objects, false);
      // }
    };

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    setCanvasSize();

    const context = canvas.getContext("2d");
    if (context) {
      contextRef.current = context;
    }

    canvas.onmousemove = (e: MouseEvent) => {
      const x = e.x;
      const y = e.y;
      setPointer(() => ({ x: x, y: y }));
    };

    window.addEventListener("resize", windowResize);
    setAnimationTimer();
    setGenerationTimer();
    setMovementTimer();
    return () => {
      window.removeEventListener("resize", windowResize);
      const monsterAnimationFrame = monsterRef.current.animationFrame;
      const monsterGenerationFrame = monsterRef.current.generationFrame;
      const monsterMovementFrame = monsterRef.current.movementFrame;
      if (monsterAnimationFrame.animationFrame) cancelAnimationFrame(monsterAnimationFrame.animationFrame);
      if (monsterMovementFrame.animationFrame) cancelAnimationFrame(monsterMovementFrame.animationFrame);
      if (monsterGenerationFrame && monsterGenerationFrame.animationFrame) cancelAnimationFrame(monsterGenerationFrame.animationFrame);
    };
  }, []);

  return (
    <div className={style.gameScreen}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MonsterScreen;
