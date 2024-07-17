import { useEffect, useRef, useState } from "react";
import { MonsterManager } from "../../util/monster/monsterManager";
import { AnimationFrameInfo } from "../../util/object/animationFrameInfo";
import style from "../../assets/css/gameScreen.module.css";
import { MapManager } from "../../util/map/mapManager";
import MonsterElementHandler from "../../util/monster/monsterElementHandler";
import { getCurrentBlockSize } from "../../util/windowSize";
import { Resource } from "../../util/resource";
import mapCoordConverter from "../../util/map/mapCoordConverter";

type monsterScreenProps = {
  monsterRef: React.MutableRefObject<MonsterManager>;
  mapManager: React.MutableRefObject<MapManager>;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
};

const MonsterScreen = ({ monsterRef, mapManager, setResource }: monsterScreenProps) => {
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
        const objectFrame = monsterElementHandler.loadFrames(object, 0, 2);
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

  function setDamageTimer() {
    const giveDamage = () => {
      let damage = -1;
      monsterRef.current.monsters.forEach((monster) => {
        if (!canvasRef.current) return;
        const position = monsterElementHandler.getPosition(canvasRef.current, monster);
        const [mpx, mpy] = mapCoordConverter.canvasToMapCoord(position.posX, position.posY, mapManager.current.blockSize);
        if (monsterElementHandler.isOutOfRange(mpx, mpy)) damage += monster.id;
      });
      setResource((prev) => {
        if (damage > prev.health) {
          damage = prev.health;
        } else if (prev.health - damage > 100) {
          damage = 0;
        }
        console.log(prev);
        return {
          ...prev,
          health: prev.health - damage,
        };
      });
    };
    animate(monsterRef.current.damageFrame, giveDamage);
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
    if (context) {
      contextRef.current = context;
    }

    canvas.onmousemove = (e: MouseEvent) => {
      const x = e.x;
      const y = e.y;
      setPointer(() => ({ x: x, y: y }));
    };

    // window.addEventListener("resize", windowResize);
    setAnimationTimer();
    setGenerationTimer();
    setMovementTimer();
    setDamageTimer();
    return () => {
      // window.removeEventListener("resize", windowResize);
      const monsterAnimationFrame = monsterRef.current.animationFrame;
      const monsterGenerationFrame = monsterRef.current.generationFrame;
      const monsterMovementFrame = monsterRef.current.movementFrame;
      const monsterDamageFrame = monsterRef.current.damageFrame;
      if (monsterAnimationFrame.animationFrame) cancelAnimationFrame(monsterAnimationFrame.animationFrame);
      if (monsterMovementFrame.animationFrame) cancelAnimationFrame(monsterMovementFrame.animationFrame);
      if (monsterGenerationFrame && monsterGenerationFrame.animationFrame) cancelAnimationFrame(monsterGenerationFrame.animationFrame);
      if (monsterDamageFrame.animationFrame) cancelAnimationFrame(monsterDamageFrame.animationFrame);
    };
  }, []);

  return (
    <div className={style.gameScreen} style={{ zIndex: 2 }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MonsterScreen;
