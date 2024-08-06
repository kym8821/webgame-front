import { SelectedComponent } from '../../pages/gamePage/GamePage';
import { LauncherManager } from '../../util/launcher/launcherManager';
import { CanvasManager } from '../../util/object/CanvasManager';
import { MapManager } from '../../util/map/mapManager';
import { MonsterManager } from '../../util/monster/monsterManager';
import { ProjectileManager } from '../../util/projectile/projectileManager';
import { useEffect, useRef } from 'react';
import { handleCanvasClickEvent } from '../../util/canvasClickEvent';
import style from '../../assets/css/gameScreen.module.css';
import { CanvasObjectManager } from '../../util/object/canvasObjectManager';
import MonsterElementHandler from '../../util/monster/monsterElementHandler';
import ProjectileElementHandler from '../../util/projectile/projectileElementHandler';
import LauncherElementHandler from '../../util/launcher/launcherElementHandler';
import { getCurrentBlockSize } from '../../util/windowSize';
import MapElementHandler from '../../util/map/mapElementHandler';
import { FacilityManager } from '../../util/facility/facilityManager';
import FacilityElementHandler from '../../util/facility/facilityElementHandler';
import { Resource } from '../../util/resource';
import { AnimationFrameInfo } from '../../util/object/animationFrameInfo';
import mapCoordConverter from '../../util/map/mapCoordConverter';

interface UserInterfaceScreen {
  userScreenManager: React.MutableRefObject<CanvasManager>;
  launcherRef: React.MutableRefObject<LauncherManager>;
  monsterRef: React.MutableRefObject<MonsterManager>;
  projectileRef: React.MutableRefObject<ProjectileManager>;
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  mapManager: React.MutableRefObject<MapManager>;
  facilityManager: React.MutableRefObject<FacilityManager>;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

interface Pos {
  x: number;
  y: number;
}

interface TransformInfo {
  scale: number;
  panning: boolean;
  viewPos: Pos;
  startPos: Pos;
}

const UserInterfaceScreen = ({
  userScreenManager,
  launcherRef,
  monsterRef,
  projectileRef,
  selectedComponent,
  mapManager,
  facilityManager,
  resource,
  setResource,
}: UserInterfaceScreen) => {
  const [canvasRef, contextRef] = [userScreenManager.current.canvasRef, userScreenManager.current.contextRef];
  const transformInfoRef = useRef<TransformInfo>({
    scale: 1,
    panning: false,
    viewPos: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
  });
  const lastUpdatedBlockSize = useRef<number>(0);

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

  useEffect(() => {
    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.width / 2;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvasSize();
    canvas.onresize = setCanvasSize;
    canvas.onclick = (e: MouseEvent) => {
      // alert('mouse event');
      handleCanvasClickEvent(
        e,
        selectedComponent,
        launcherRef,
        monsterRef,
        mapManager,
        facilityManager,
        resource,
        setResource
      );
    };

    const monsterHandler = new MonsterElementHandler(mapManager.current);
    const projectileHandler = new ProjectileElementHandler(mapManager.current);
    const launcherHandler = new LauncherElementHandler(mapManager.current);
    const mapHandler = new MapElementHandler(mapManager.current);
    const facilityHandler = new FacilityElementHandler(mapManager.current);
    window.addEventListener('resize', () => {
      function resizeScreen(manager: CanvasObjectManager | CanvasManager) {
        const [canvas, context] = [manager.canvasRef.current, manager.contextRef.current];
        if (!canvas || !context) return;
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.width / 2;
      }

      const currentBlockSize = getCurrentBlockSize(canvas.scrollWidth, mapManager.current.numberMap);
      if (currentBlockSize) {
        const mapContext = mapManager.current.contextRef.current;
        const facilityContext = facilityManager.current.contextRef.current;
        mapManager.current.blockSize = currentBlockSize;
        resizeScreen(monsterRef.current);
        resizeScreen(launcherRef.current);
        resizeScreen(projectileRef.current);
        resizeScreen(mapManager.current);
        resizeScreen(facilityManager.current);
        mapManager.current.blockSize = currentBlockSize;
        if (mapContext) {
          mapHandler.draw(mapContext);
        }
        if (facilityContext) {
          facilityHandler.draw(facilityManager.current);
        }
      }
    });
    const context = canvas.getContext('2d');
    if (context) {
      contextRef.current = context;
      draw();
    }
  }, [selectedComponent, resource]);

  const setTransform = () => {
    // const context = contextRef.current;
    const canvas = monsterRef.current.canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    //const context = monsterRef.current.contextRef.current;
    if (!context) return;
    const transformInfo = transformInfoRef.current;
    context.setTransform(
      transformInfo.scale,
      0,
      0,
      transformInfo.scale,
      transformInfo.viewPos.x,
      transformInfo.viewPos.y
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    transformInfoRef.current.panning = true;
    const lastViewPos = transformInfoRef.current.viewPos;
    transformInfoRef.current.startPos = {
      x: offsetX - lastViewPos.x,
      y: offsetY - lastViewPos.y,
    };
  };

  const handleMouseUp = () => {
    transformInfoRef.current.panning = false;
  };

  const handleMouseOut = () => {
    transformInfoRef.current.panning = false;
  };

  const draw = () => {
    setTransform();
    const context = monsterRef.current.contextRef.current;
    const canvas = monsterRef.current.canvasRef.current;
    if (!context || !canvas) return;
    canvas.width = canvas.width;
    setTransform();
    // context.fillRect(0, 0, 100, 100);
    const monsterHandler = new MonsterElementHandler(mapManager.current);
    // monsterHandler.animate(canvas, context, monsterRef.current.monsters, false);
    monsterHandler.move(canvas, context, monsterRef.current.monsters, false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();

    if (!transformInfoRef.current.panning) return;
    const lastStartPos = transformInfoRef.current.startPos;
    transformInfoRef.current.viewPos = {
      x: offsetX - lastStartPos.x,
      y: offsetY - lastStartPos.y,
    };
    draw();
  };

  return (
    <div className={`${style.gameScreen} ${style.clickEventScreen}`} style={{ zIndex: 10 }}>
      <canvas
        ref={userScreenManager.current.canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
};

export default UserInterfaceScreen;
