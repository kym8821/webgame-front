import { SelectedComponent } from '../pages/gamePage/GamePage';
import LauncherElementHandler from './launcher/launcherElementHandler';
import { LauncherInfo } from './launcher/launcherInfo';
import { LauncherManager } from './launcher/launcherManager';
import { CanvasManager } from './object/CanvasManager';
import mapCoordConverter from './map/mapCoordConverter';
import mapElementInfo, { MapElementInfo } from './map/mapElementInfo';
import { MapManager } from './map/mapManager';
import { MonsterManager } from './monster/monsterManager';
import MapElementHandler from './map/mapElementHandler';
import { FacilityManager } from './facility/facilityManager';
import { FacilityInfo } from './facility/facilityInfo';
import FacilityElementHandler from './facility/facilityElementHandler';
import { Resource } from './resource';
import { Console } from 'console';

const SelectedComponentType = {
  mapElement: 1,
  launcher: 2,
  facility: 3,
};

function handleFacilityCreateEvent(
  e: MouseEvent,
  mapManager: React.MutableRefObject<MapManager>,
  selectedComponent: SelectedComponent | null,
  facilityManager: React.MutableRefObject<FacilityManager>,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  const [canvas, context] = [facilityManager.current.canvasRef.current, facilityManager.current.contextRef.current];
  if (!canvas || !context) return;
  if (!selectedComponent || !selectedComponent.component) return;
  if (selectedComponent.type != SelectedComponentType.facility) return;
  const component = selectedComponent.component as FacilityInfo;
  const facilityElementHandler = new FacilityElementHandler(mapManager.current);
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapCoordConverter.canvasToMapCoord(px, py, mapManager.current.blockSize);
  const mapElement = mapManager.current.map[mapPointY][mapPointX];
  console.log(component);
  if (component.tag.objectRemover) {
    const facilities = facilityManager.current.facilities;
    for (let i = 0; i < facilities.length; i++) {
      const fac = facilities[i];
      if (fac.mapPosX === mapPointX && fac.mapPosY === mapPointY) {
        facilities.splice(i, 1);
        i -= 1;
      }
    }
  } else {
    if (resource.energy < component.energy || resource.evolveFactor < component.evolveFactor) return;
    facilityManager.current.facilities.push(facilityElementHandler.loadFrames(component, mapPointX, mapPointY));
    mapManager.current.map[mapPointY][mapPointX].empty = false;
  }
  const [energyOutput, evolveFactorOutput] = facilityElementHandler.getCurrentOutput(
    facilityManager.current.facilities
  );
  console.log(energyOutput, evolveFactorOutput);
  setResource((prev) => {
    return {
      ...prev,
      energy: prev.energy - component.energy,
      evolveFactor: prev.evolveFactor - component.evolveFactor,
      energyOutput: energyOutput,
      evolveFactorOutput: evolveFactorOutput,
    };
  });
  facilityElementHandler.draw(facilityManager.current);
}

function handleMapElementCreateEvent(
  e: MouseEvent,
  mapManager: React.MutableRefObject<MapManager>,
  selectedComponent: SelectedComponent | null,
  facilityManager: React.MutableRefObject<FacilityManager>,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  console.log('click event');
  console.log(selectedComponent);
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
  if (component.id === mapElementInfo.objectRemover.id) {
    const facilities = facilityManager.current.facilities;
    const launchers = launcherRef.current.launchers;
    mapManager.current.map[mapPointY][mapPointX] = {
      info: mapElementInfo.tile,
      activate: false,
      empty: true,
      mapPosX: mapPointX,
      mapPosY: mapPointY,
    };
    for (let i = 0; i < facilities.length; i++) {
      const fac = facilities[i];
      if (fac.mapPosX === mapPointX && fac.mapPosY === mapPointY) {
        facilities.splice(i, 1);
        i -= 1;
      }
    }
    for (let i = 0; i < launchers.length; i++) {
      const launcher = launchers[i];
      if (launcher.mapStartX === mapPointX && launcher.mapStartY === mapPointY) {
        launchers.splice(i, 1);
        i -= 1;
      }
    }
    const facilityElementHandler = new FacilityElementHandler(mapManager.current);
    const launcherElementHandler = new LauncherElementHandler(mapManager.current);
    facilityElementHandler.draw(facilityManager.current);
    launcherElementHandler.draw(canvas, context, launcherRef.current.launchers, monsterRef.current, true);
    const [energyOutput, evolveFactorOutput] = facilityElementHandler.getCurrentOutput(
      facilityManager.current.facilities
    );
    console.log(energyOutput, evolveFactorOutput);
    setResource((prev) => {
      return {
        ...prev,
        energyOutput: energyOutput,
        evolveFactorOutput: evolveFactorOutput,
      };
    });
  } else if (mapElement.info.tag.base) {
    if (resource.energy >= component.energy && resource.evolveFactor >= component.gas) {
      mapManager.current.map[mapPointY][mapPointX].info = component;
      mapManager.current.map[mapPointY][mapPointX].activate = false;
      setResource((prev) => ({
        ...prev,
        energy: prev.energy - component.energy,
        evolveFactor: prev.evolveFactor - component.gas,
      }));
    }
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
  monsterRef: React.MutableRefObject<MonsterManager>,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
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
  if (resource.energy < component.energy || resource.evolveFactor < component.gas) return;
  const launcherHandler = new LauncherElementHandler(mapInfo.current);
  // 캔버스의 경계 상자를 가져옵니다.
  const rect = canvas.getBoundingClientRect();
  // 이벤트 좌표를 캔버스 내부 좌표로 변환합니다.
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const [mapPointX, mapPointY] = mapCoordConverter.canvasToMapCoord(px, py, mapInfo.current.blockSize);
  const mapElement = mapInfo.current.map[mapPointY][mapPointX];
  if (!mapElement.info.tag.turretBase) return;
  setResource((prev) => ({
    ...prev,
    energy: prev.energy - component.energy,
    evolveFactor: prev.evolveFactor - component.gas,
  }));
  if (!component.tag.objectRemover) {
    const launcher = launcherHandler.loadFrames(component, mapPointX, mapPointY);
    if (!launcher) return;
    launcherRef.current.launchers.push(launcher);
    launcherHandler.draw(canvas, context, launcherRef.current.launchers, monsterRef.current, true);
  } else {
    launcherRef.current.launchers.forEach((obj, idx) => {
      const { mapStartX, mapStartY } = obj;
      if (mapStartX === mapPointX && mapStartY === mapPointY) {
        launcherRef.current.launchers.splice(idx, 1);
      }
    });
  }
}

export function handleCanvasClickEvent(
  e: MouseEvent,
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null,
  launcherRef: React.MutableRefObject<LauncherManager>,
  monsterRef: React.MutableRefObject<MonsterManager>,
  mapManager: React.MutableRefObject<MapManager>,
  facilityManager: React.MutableRefObject<FacilityManager>,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  handleMapElementCreateEvent(
    e,
    mapManager,
    selectedComponent,
    facilityManager,
    launcherRef,
    monsterRef,
    resource,
    setResource
  );
  handleLauncherCreateEvent(e, mapManager, selectedComponent, launcherRef, monsterRef, resource, setResource);
  handleFacilityCreateEvent(e, mapManager, selectedComponent, facilityManager, resource, setResource);
}

export { SelectedComponentType };
