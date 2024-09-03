import { useEffect, useRef } from "react";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import style from "../../assets/css/gameScreen.module.css";
import { Resource } from "../../util/resource";
import { TotalScreenManager } from "../../util/totalScreenManager";
import monsterInfo, { getNextMonster } from "../../util/monster/monsterInfo";
import { MonsterFrameClass } from "../../util/monster/monsterFrame";
import { TotalElementHandler } from "../../util/totalElementHandler";

type monsterScreenProps = {
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
};

const MonsterScreen = ({ totalScreenManager, totalElementHandler, setResource }: monsterScreenProps) => {
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

  function setGenerationTimer() {
    if (!totalScreenManager) return;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const generate = () => {
      const object = getNextMonster();
      if (object) {
        const nextMonsterId =
          monsterManager.objects.length > 0 ? monsterManager.objects[monsterManager.objects.length - 1].frame.id + 1 : 1;
        const objectFrame = MonsterFrameClass.loadFrame(object, 0, 2, nextMonsterId);
        if (objectFrame) monsterManager.objects.push(objectFrame);
      }
    };
    animate(monsterManager.generationFrame, generate);
  }

  function setAnimationTimer() {
    if (!totalScreenManager || !totalElementHandler) return;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const monsterElementHandler = totalElementHandler.monsterHandler;
    const animateMonster = () => {
      monsterElementHandler.animate();
    };
    animate(monsterManager.animationFrame, animateMonster);
  }

  function setMovementTimer() {
    if (!totalScreenManager || !totalElementHandler) return;
    const monsterElementHandler = totalElementHandler.monsterHandler;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const moveMonster = () => {
      monsterElementHandler.drawNext();
    };
    animate(monsterManager.movementFrame, moveMonster);
  }

  function setDamageTimer() {
    if (!totalScreenManager || !totalElementHandler) return;
    const monsterElementHandler = totalElementHandler.monsterHandler;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const mapManager = totalScreenManager.mapManager;
    const canvas = canvasRef.current;
    const giveDamage = () => {
      if (!monsterElementHandler || !canvas) return;
      let damage = -1;
      const blockSize = monsterElementHandler.mapManager.blockSize;
      monsterManager.objects.forEach((monster) => {
        const position = monster.getPosition(canvas.width, canvas.height, blockSize);
        if (monster.intersectWithCore(canvas.width, canvas.height, mapManager.manager, blockSize)) damage += monster.frame.id + 1;
      });
      setResource((prev) => {
        return {
          ...prev,
          health: prev.health - damage >= 0 ? prev.health - damage : 0,
        };
      });
    };
    animate(monsterManager.damageFrame, giveDamage);
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
      totalScreenManager.monsterManager.manager.canvasRef = canvasRef;
      totalScreenManager.monsterManager.manager.contextRef = contextRef;
    }
    setCanvasAndContext();
    if (!totalScreenManager || !totalElementHandler) return;
    // set facilityElementHandler
    totalElementHandler.monsterHandler.reDraw();
    const monsterManager = totalScreenManager.monsterManager.manager;
    // set animation frame
    setAnimationTimer();
    setGenerationTimer();
    setMovementTimer();
    setDamageTimer();
    return () => {
      if (monsterManager.animationFrame.animationFrame) cancelAnimationFrame(monsterManager.animationFrame.animationFrame);
      if (monsterManager.generationFrame.animationFrame) cancelAnimationFrame(monsterManager.generationFrame.animationFrame);
      if (monsterManager.damageFrame.animationFrame) cancelAnimationFrame(monsterManager.damageFrame.animationFrame);
      if (monsterManager.movementFrame.animationFrame) cancelAnimationFrame(monsterManager.movementFrame.animationFrame);
    };
  }, [totalScreenManager, totalElementHandler, canvasRef, contextRef, monsterInfo]);

  return (
    <div className={style.gameScreen} style={{ zIndex: 2 }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MonsterScreen;
