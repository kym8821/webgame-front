import { useEffect, useRef, useState } from "react";
import MonsterFrame from "../../util/monsterFrame";
import monsterLoader from "../../util/monsterLoader";
import { AnimationFrameInfo } from "../../util/animationFrameInfo";
import monsterDrawer from "../../util/monsterDrawer";

const GameScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const monstersRef = useRef<MonsterFrame[]>([]);
  const projectileRef = useRef([]);
  const monsterAnimationRef = useRef<AnimationFrameInfo>({
    lastFrameTime: 0,
    interval: 500,
    animationFrame: null,
  });
  const monsterGenerationRef = useRef<AnimationFrameInfo>({
    lastFrameTime: 0,
    interval: 3000,
    animationFrame: null,
  });

  const animateMonster = () => {
    const animation = monsterAnimationRef.current;
    const step = (timestamp: number) => {
      const { interval, lastFrameTime } = monsterAnimationRef.current;
      if (timestamp - lastFrameTime > interval) {
        animation.lastFrameTime = timestamp;
        monsterDrawer.drawMonsters(canvasRef.current, contextRef.current, monstersRef.current, true);
      }
      if (animation) animation.animationFrame = requestAnimationFrame(step);
    };
    if (animation) animation.animationFrame = requestAnimationFrame(step);
  };

  const setMonsterGenerationTimer = () => {
    const monsterAnimationFrame = monsterAnimationRef.current;
    const monsterGenerationFrame = monsterGenerationRef.current;
    // 몬스터를 생성하는 함수
    const generateMonster = () => {
      const monster = monsterLoader.getRandomMonster();
      if (monster) {
        const monsterFrame = monsterLoader.loadMonsterFrames(monster);
        if (monsterFrame) monstersRef.current.push(monsterFrame);
      }
      if (monsterAnimationFrame.animationFrame) cancelAnimationFrame(monsterAnimationFrame.animationFrame); // 이전 애니메이션 취소
      animateMonster();
    };
    // 몬스터 생성 속도 제어 함수
    const step = (timestamp: number) => {
      if (!monsterGenerationFrame) return;
      const { interval, lastFrameTime } = monsterGenerationRef.current;
      if (timestamp - lastFrameTime > interval) {
        monsterGenerationFrame.lastFrameTime = timestamp;
        generateMonster();
      }
      monsterGenerationFrame.animationFrame = requestAnimationFrame(step);
    };
    monsterGenerationFrame.animationFrame = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = canvas.width * 0.5;

    const context = canvas.getContext("2d");
    if (context) {
      contextRef.current = context;
    }

    canvas.onclick = (e: MouseEvent) => {
      const x = e.x;
      const y = e.y;
      const delta = 10;
      monstersRef.current.forEach((monster, index) => {
        const { posX, posY, boundX, boundY } = monsterDrawer.getMonsterPosition(canvas, monster);
        if (posX - delta <= x && x <= boundX + delta && posY - delta <= y && y <= boundY + delta) {
          console.log(monster.info);
          monstersRef.current.splice(index, 1);
        }
      });
    };

    const windowResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width * 0.5;
      monsterDrawer.drawMonsters(canvasRef.current, contextRef.current, monstersRef.current, false); // 리사이즈 시 이미지 재그리기
    };
    window.addEventListener("resize", windowResize);
    setMonsterGenerationTimer();

    return () => {
      window.removeEventListener("resize", windowResize);
      if (monsterGenerationRef.current.animationFrame) cancelAnimationFrame(monsterGenerationRef.current.animationFrame);
      if (monsterAnimationRef.current.animationFrame) cancelAnimationFrame(monsterAnimationRef.current.animationFrame);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GameScreen;
