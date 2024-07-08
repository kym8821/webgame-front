import { useEffect, useRef, useState } from 'react';
import { MonsterManager } from '../../util/monster/monsterManager';
import { CanvasObjectManager } from '../../util/canvasObjectManager';
import { ObjectLoader } from '../../util/objectLoader';
import { AnimationFrameInfo } from '../../util/animationFrameInfo';
import { ObjectDrawer } from '../../util/objectDrawer';
import monsterDrawer from '../../util/monster/monsterDrawer';
import monsterLoader from '../../util/monster/monsterLoader';
import '../../assets/css/canvasStyle.css';

type monsterScreenProps = {
  monsterRef: MonsterManager;
};

const MonsterScreen = ({ monsterRef }: monsterScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [pointer, setPointer] = useState({
    x: -1,
    y: -1,
  });

  // 일정 주기마다 오브젝트를 생성 / 갱신하기 위한 타이머 설정 함수
  function setObjectTimer(objectManager: CanvasObjectManager, objectLoader: ObjectLoader) {
    const { objects, animationFrame, generationFrame } = objectManager;
    if (!generationFrame) return;
    // 오브젝트를 생성하는 함수
    const generate = () => {
      const object = objectLoader.getNextObject();
      if (object) {
        const objectFrame = objectLoader.loadFrames(object);
        if (objectFrame) objects.push(objectFrame);
      }
    };

    // 오브젝트 생성 속도 제어 함수
    const step = (timestamp: number) => {
      const { interval, lastFrameTime } = generationFrame;
      if (timestamp - lastFrameTime > interval) {
        generationFrame.lastFrameTime = timestamp;
        generate();
      }
      if (generationFrame.animationFrame) cancelAnimationFrame(generationFrame.animationFrame);
      generationFrame.animationFrame = requestAnimationFrame(step);
    };
    generationFrame.animationFrame = requestAnimationFrame(step);

    // 오브젝트 갱신 로직
    function animate<T>(objects: T[], animation: AnimationFrameInfo, drawer: ObjectDrawer) {
      const step = (timestamp: number) => {
        const { interval, lastFrameTime } = animation;
        if (timestamp - lastFrameTime > interval) {
          animation.lastFrameTime = timestamp;
          drawer.draw(canvasRef.current, contextRef.current, objects, true);
        }
        if (animation) animation.animationFrame = requestAnimationFrame(step);
      };
      if (animation) animation.animationFrame = requestAnimationFrame(step);
    }
    if (animationFrame.animationFrame) cancelAnimationFrame(animationFrame.animationFrame); // 이전 애니메이션 취소
    animate(objects, animationFrame, monsterDrawer);
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = canvas.width * 0.5;

    const context = canvas.getContext('2d');
    if (context) {
      contextRef.current = context;
    }

    canvas.onclick = (e: MouseEvent) => {
      console.log('click');
      const x = e.x;
      const y = e.y;
      const delta = 10;
      const { objects } = monsterRef;
      objects.forEach((monster, index) => {
        const { posX, posY, boundX, boundY } = monsterDrawer.getPosition(canvas, monster);
        if (posX - delta <= x && x <= boundX + delta && posY - delta <= y && y <= boundY + delta) {
          objects.splice(index, 1);
          monsterDrawer.draw(canvasRef.current, contextRef.current, monsterRef.objects, false); // 리사이즈 시 이미지 재그리기
        }
      });
    };

    canvas.onmousemove = (e: MouseEvent) => {
      const x = e.x;
      const y = e.y;
      setPointer(() => ({ x: x, y: y }));
    };

    const windowResize = () => {
      console.log('resize : redraw monster');
      canvas.width = window.innerWidth;
      canvas.height = canvas.width * 0.5;
      monsterDrawer.draw(canvasRef.current, contextRef.current, monsterRef.objects, false); // 리사이즈 시 이미지 재그리기
    };
    window.addEventListener('resize', windowResize);
    setObjectTimer(monsterRef, monsterLoader);
    return () => {
      window.removeEventListener('resize', windowResize);
      const monsterAnimationFrame = monsterRef.animationFrame;
      const monsterGenerationFrame = monsterRef.generationFrame;
      if (monsterAnimationFrame.animationFrame) cancelAnimationFrame(monsterAnimationFrame.animationFrame);
      if (monsterGenerationFrame && monsterGenerationFrame.animationFrame)
        cancelAnimationFrame(monsterGenerationFrame.animationFrame);
    };
  }, []);

  return (
    <div className="monsterScreen">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MonsterScreen;
