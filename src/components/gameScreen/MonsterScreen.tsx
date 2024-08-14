import { useEffect } from "react";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import style from "../../assets/css/gameScreen.module.css";
import MonsterElementHandler from "../../util/monster/monsterElementHandler";
import { Resource } from "../../util/resource";
import mapCoordConverter from "../../util/map/mapCoordConverter";
import { TotalScreenManager } from "../../util/totalScreenManager";
import { getNextMonster } from "../../util/monster/monsterInfo";
import { MonsterFrameClass } from "../../util/monster/monsterFrame";

type monsterScreenProps = {
  totalScreenManager: TotalScreenManager | undefined;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
};

const MonsterScreen = ({ totalScreenManager, setResource }: monsterScreenProps) => {
  let monsterElementHandler: MonsterElementHandler | null = null;

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
      if (!monsterElementHandler) return;
      const object = getNextMonster();
      if (object) {
        const nextMonsterId = monsterManager.objects[monsterManager.objects.length - 1].frame.id + 1;
        const objectFrame = MonsterFrameClass.loadFrame(object, 0, 2, nextMonsterId);
        if (objectFrame) monsterManager.objects.push(objectFrame);
      }
    };
    animate(monsterManager.generationFrame, generate);
  }

  function setAnimationTimer() {
    if (!totalScreenManager) return;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const animateMonster = () => {
      if (!monsterElementHandler) return;
      monsterElementHandler.animate();
    };
    animate(monsterManager.animationFrame, animateMonster);
  }

  function setMovementTimer() {
    if (!totalScreenManager) return;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const moveMonster = () => {
      monsterElementHandler?.drawNext();
    };
    animate(monsterManager.movementFrame, moveMonster);
  }

  function setDamageTimer() {
    if (!totalScreenManager) return;
    const monsterManager = totalScreenManager.monsterManager.manager;
    const mapManager = totalScreenManager.mapManager;
    const canvas = monsterManager.canvasRef.current;
    const giveDamage = () => {
      if (!monsterElementHandler || !canvas) return;
      let damage = -1;
      const blockSize = monsterElementHandler.mapManager.blockSize;
      monsterManager.objects.forEach((monster) => {
        const position = monster.getPosition(canvas.width, canvas.height, blockSize);
        const [mpx, mpy] = mapCoordConverter.canvasToMapCoord(position.posX, position.posY, blockSize);
        if (monster.intersectWithCore(canvas.width, canvas.height, mapManager.manager)) damage += monster.frame.id + 1;
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
    if (!totalScreenManager) return;
    const { canvasRef, contextRef } = totalScreenManager.monsterManager.manager;
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
    const monsterManager = totalScreenManager.monsterManager.manager;
    const monsterElementHandler = new MonsterElementHandler(monsterManager, mapManager);
    monsterElementHandler.reDraw();
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
  }, []);

  return (
    <div className={style.gameScreen} style={{ zIndex: 2 }}>
      {totalScreenManager && <canvas ref={totalScreenManager.monsterManager.manager.canvasRef}></canvas>}
    </div>
  );
};

export default MonsterScreen;
