import { SelectedComponent } from "../pages/gamePage/GamePage";
import LauncherElementHandler from "./launcher/launcherElementHandler";
import { LauncherInfo } from "./launcher/launcherInfo";
import { LauncherManager } from "./launcher/launcherManager";
import { CanvasManager } from "./object/CanvasManager";
import mapDrawer from "./map/mapCoordConverter";
import mapElementInfo, { MapElementInfo } from "./map/mapElementInfo";
import { MapManager } from "./map/mapManager";
import { MonsterManager } from "./monster/monsterManager";
import MapElementHandler from "./map/mapElementHandler";

function handleMapElementCreateEvent(
  e: MouseEvent,
  mapManager: React.MutableRefObject<MapManager>,
  selectedComponent: React.MutableRefObject<SelectedComponent | null>
) {
  const [canvas, context] = [mapManager.current.canvasRef.current, mapManager.current.contextRef.current];
  if (!canvas || !context) return;
  if (!selectedComponent.current || !selectedComponent.current.component) return;
  if (selectedComponent.current.type != 1) return;
  const component = selectedComponent.current.component as MapElementInfo;
  console.log(component);
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapDrawer.canvasToMapCoord(px, py, mapManager.current.blockSize);
  const mapElement = mapManager.current.map[mapPointY][mapPointX];
  if (mapElement.info.id == mapElementInfo.tile.id) {
    mapManager.current.map[mapPointY][mapPointX].info = component;
    mapManager.current.map[mapPointY][mapPointX].activate = false;
    // if (context) mapDrawer.draw(context, mapManager.current.map, mapManager.current.blockSize);
    if (context) {
      const mapElementHandler = new MapElementHandler(mapManager.current);
      mapElementHandler.draw(context);
    }
  }
}

function handleLauncherCreateEvent(
  e: MouseEvent,
  mapInfo: React.MutableRefObject<MapManager>,
  selectedComponent: React.MutableRefObject<SelectedComponent | null>,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>
) {
  const [canvas, context] = [launcherRef.current.canvasRef.current, launcherRef.current.contextRef.current];
  if (!selectedComponent.current || !selectedComponent.current.component) return;
  if (selectedComponent.current.type != 2) return;
  if (!canvas || !context) return;
  const component = selectedComponent.current.component as LauncherInfo;
  const launcherHandler = new LauncherElementHandler(mapInfo.current);
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapDrawer.canvasToMapCoord(px, py, mapInfo.current.blockSize);
  const mapElement = mapInfo.current.map[mapPointY][mapPointX];
  if (mapElement.info.id !== mapElementInfo.base1.id) return;
  const launcher = launcherHandler.loadFrames(component, mapPointX, mapPointY);
  if (launcher) {
    launcherRef.current.launchers.push(launcher);
    launcherHandler.draw(canvas, context, launcherRef.current.launchers, monsterRef.current, true);
  }
}

export function handleCanvasClickEvent(
  e: MouseEvent,
  selectedComponent: React.MutableRefObject<SelectedComponent | null>,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>,
  mapManager: React.MutableRefObject<MapManager>
) {
  handleMapElementCreateEvent(e, mapManager, selectedComponent);
  handleLauncherCreateEvent(e, mapManager, selectedComponent, launcherRef, monsterRef);
}
