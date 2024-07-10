import { SelectedComponent } from "../pages/gamePage/GamePage";
import LauncherElementHandler from "./launcher/launcherElementHandler";
import { LauncherInfo } from "./launcher/launcherInfo";
import { LauncherManager } from "./launcher/launcherManager";
import { MapCanvasManager } from "./map/mapCanvasManager";
import mapDrawer from "./map/mapDrawer";
import mapElementInfo, { MapElementInfo } from "./map/mapElementInfo";
import { MapInfo } from "./map/mapInfo";
import { MonsterManager } from "./monster/monsterManager";

function handleMapElementCreateEvent(
  e: MouseEvent,
  mapInfo: React.MutableRefObject<MapInfo>,
  mapManager: React.MutableRefObject<MapCanvasManager>,
  selectedComponent: React.MutableRefObject<SelectedComponent | null>
) {
  const [canvas, context] = [mapManager.current.canvasRef.current, mapManager.current.contextRef.current];
  if (!canvas || !context) return;
  if (!selectedComponent.current || !selectedComponent.current.component) return;
  if (selectedComponent.current.type != 1) return;
  const component = selectedComponent.current.component as MapElementInfo;
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapDrawer.canvasToMapCoord(px, py, mapInfo.current.blockSize);
  const mapElementId = mapInfo.current.map[mapPointY][mapPointX];
  if (mapElementId == 4) {
    mapInfo.current.map[mapPointY][mapPointX] = component.id;
    if (context) mapDrawer.draw(context, mapInfo.current.map, mapInfo.current.blockSize);
    // console.log(mapInfo.current.map);
  }
}

function handleLauncherCreateEvent(
  e: MouseEvent,
  mapInfo: React.MutableRefObject<MapInfo>,
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
  const mapElementId = mapInfo.current.map[mapPointY][mapPointX];
  if (mapElementId !== mapElementInfo.base1.id) return;
  const launcher = launcherHandler.loadFrames(component, mapPointX, mapPointY);
  if (launcher) {
    launcherRef.current.objects.push(launcher);
    launcherHandler.draw(canvas, context, launcherRef.current.objects, monsterRef.current, true);
  }
}

export function handleCanvasClickEvent(
  e: MouseEvent,
  mapInfo: React.MutableRefObject<MapInfo>,
  selectedComponent: React.MutableRefObject<SelectedComponent | null>,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>,
  mapManager: React.MutableRefObject<MapCanvasManager>
) {
  handleMapElementCreateEvent(e, mapInfo, mapManager, selectedComponent);
  handleLauncherCreateEvent(e, mapInfo, selectedComponent, launcherRef, monsterRef);
}
