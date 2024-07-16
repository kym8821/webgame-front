import { SelectedComponent } from "../pages/gamePage/GamePage";
import LauncherElementHandler from "./launcher/launcherElementHandler";
import { LauncherInfo } from "./launcher/launcherInfo";
import { LauncherManager } from "./launcher/launcherManager";
import { CanvasManager } from "./object/CanvasManager";
import mapCoordConverter from "./map/mapCoordConverter";
import mapElementInfo, { MapElementInfo } from "./map/mapElementInfo";
import { MapManager } from "./map/mapManager";
import { MonsterManager } from "./monster/monsterManager";
import MapElementHandler from "./map/mapElementHandler";
import { FacilityManager } from "./facility/facilityManager";
import { FacilityInfo } from "./facility/facilityInfo";
import FacilityElementHandler from "./facility/facilityElementHandler";

const SelectedComponentType = {
  mapElement: 1,
  launcher: 2,
  facility: 3,
};

function handleFacilityCreateEvent(
  e: MouseEvent,
  mapManager: React.MutableRefObject<MapManager>,
  selectedComponent: SelectedComponent | null,
  facilityManager: React.MutableRefObject<FacilityManager>
) {
  const [canvas, context] = [facilityManager.current.canvasRef.current, facilityManager.current.contextRef.current];
  if (!canvas || !context) return;
  if (!selectedComponent || !selectedComponent.component) return;
  if (selectedComponent.type != SelectedComponentType.facility) return;
  const component = selectedComponent.component as FacilityInfo;
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapCoordConverter.canvasToMapCoord(px, py, mapManager.current.blockSize);
  const mapElement = mapManager.current.map[mapPointY][mapPointX];
  if (!mapElement.info.tag.facilityBase || !mapElement.empty) {
    return;
  } else {
    const facilityElementHandler = new FacilityElementHandler(mapManager.current);
    facilityManager.current.facilities.push(facilityElementHandler.loadFrames(component, mapPointX, mapPointY));
    mapManager.current.map[mapPointY][mapPointX].empty = false;
    facilityElementHandler.draw(facilityManager.current);
  }
}

function handleMapElementCreateEvent(
  e: MouseEvent,
  mapManager: React.MutableRefObject<MapManager>,
  selectedComponent: SelectedComponent | null
) {
  const [canvas, context] = [mapManager.current.canvasRef.current, mapManager.current.contextRef.current];
  if (!canvas || !context) return;
  if (!selectedComponent || !selectedComponent.component) return;
  if (selectedComponent.type != SelectedComponentType.mapElement) return;
  const component = selectedComponent.component as MapElementInfo;

  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapCoordConverter.canvasToMapCoord(px, py, mapManager.current.blockSize);
  const mapElement = mapManager.current.map[mapPointY][mapPointX];
  console.log(mapElement, component);
  if (mapElement.info.tag.base) {
    mapManager.current.map[mapPointY][mapPointX].info = component;
    mapManager.current.map[mapPointY][mapPointX].activate = false;
  } else if (component.id === mapElementInfo.objectRemover.id) {
    mapManager.current.map[mapPointY][mapPointX].info = mapElementInfo.tile;
    mapManager.current.map[mapPointY][mapPointX].activate = false;
  }
  if (context) {
    const mapElementHandler = new MapElementHandler(mapManager.current);
    mapElementHandler.draw(context);
  }
}

function handleLauncherCreateEvent(
  e: MouseEvent,
  mapInfo: React.MutableRefObject<MapManager>,
  selectedComponent: SelectedComponent | null,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>
) {
  const [canvas, context] = [launcherRef.current.canvasRef.current, launcherRef.current.contextRef.current];
  // if (!selectedComponent.current || !selectedComponent.current.component) return;
  // if (selectedComponent.current.type != SelectedComponentType.launcher) return;
  // if (!canvas || !context) return;
  // const component = selectedComponent.current.component as LauncherInfo;
  if (!selectedComponent || !selectedComponent.component) return;
  if (selectedComponent.type != SelectedComponentType.launcher) return;
  if (!canvas || !context) return;
  const component = selectedComponent.component as LauncherInfo;
  const launcherHandler = new LauncherElementHandler(mapInfo.current);
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapCoordConverter.canvasToMapCoord(px, py, mapInfo.current.blockSize);
  const mapElement = mapInfo.current.map[mapPointY][mapPointX];
  if (!mapElement.info.tag.turretBase) return;
  const launcher = launcherHandler.loadFrames(component, mapPointX, mapPointY);
  if (launcher) {
    launcherRef.current.launchers.push(launcher);
    launcherHandler.draw(canvas, context, launcherRef.current.launchers, monsterRef.current, true);
  }
}

export function handleCanvasClickEvent(
  e: MouseEvent,
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>,
  mapManager: React.MutableRefObject<MapManager>,
  facilityManager: React.MutableRefObject<FacilityManager>
) {
  handleMapElementCreateEvent(e, mapManager, selectedComponent);
  handleLauncherCreateEvent(e, mapManager, selectedComponent, launcherRef, monsterRef);
  handleFacilityCreateEvent(e, mapManager, selectedComponent, facilityManager);
}

export { SelectedComponentType };
