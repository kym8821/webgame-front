import { SelectedComponent } from "../pages/gamePage/GamePage";
import { LauncherInfo } from "./launcher/launcherInfo";
import mapCoordConverter from "./map/mapCoordConverter";
import mapElementInfo, { MapElementInfo } from "./map/mapElementInfo";
import { FacilityInfo } from "./facility/facilityInfo";
import { Resource } from "./resource";
import { TotalElementHandler } from "./totalElementHandler";
import { FacilityFrameClass } from "./facility/facilityFrame";
import { MapFrameClass } from "./map/mapFrame";
import { TotalScreenManager } from "./totalScreenManager";
import { LauncherFrameClass } from "./launcher/launcherFrame";

const SelectedComponentType = {
  mapElement: 1,
  launcher: 2,
  facility: 3,
};

function getMapPoint(clientX: number, clientY: number, canvas: HTMLCanvasElement, blockSize: number) {
  const rect = canvas.getBoundingClientRect();
  const [canvasPointX, canvasPointY] = [clientX - rect.left, clientY - rect.top];
  return mapCoordConverter.canvasToMapCoord(canvasPointX, canvasPointY, blockSize);
}

function handleFacilityCreateEvent(
  e: MouseEvent,
  totalScreenManager: TotalScreenManager,
  totalElementHandler: TotalElementHandler,
  selectedComponent: SelectedComponent,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  const { canvasRef, contextRef } = totalElementHandler.facilityHandler.manager;
  if (!canvasRef.current || !contextRef.current) return;
  if (selectedComponent.type != SelectedComponentType.facility) return;
  const component = selectedComponent.component as FacilityInfo;
  const blockSize = totalElementHandler.mapHandler.mapManager.blockSize;
  const facilities = totalElementHandler.facilityHandler.manager.objects;
  const mapManager = totalElementHandler.mapHandler.mapManager;
  const [mapPointX, mapPointY] = getMapPoint(e.clientX, e.clientY, canvasRef.current, blockSize);
  if (component.tag.objectRemover) {
    totalScreenManager.facilityManager.deleteByMapPoint(mapPointX, mapPointY);
  } else {
    if (resource.energy < component.energy || resource.evolveFactor < component.evolveFactor) return;
    facilities.push(FacilityFrameClass.loadFrame(component, mapPointX, mapPointY));
    mapManager.map[mapPointY][mapPointX].frame.empty = false;
  }
  const [energyOutput, evolveFactorOutput] = totalElementHandler.facilityHandler.getCurrentOutput();
  setResource((prev) => {
    return {
      ...prev,
      energy: prev.energy - component.energy,
      evolveFactor: prev.evolveFactor - component.evolveFactor,
      energyOutput: energyOutput,
      evolveFactorOutput: evolveFactorOutput,
    };
  });
  totalElementHandler.facilityHandler.reDraw();
}

function handleMapElementCreateEvent(
  e: MouseEvent,
  totalScreenManager: TotalScreenManager,
  totalElementHandler: TotalElementHandler,
  selectedComponent: SelectedComponent,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  const { canvasRef, contextRef } = totalElementHandler.mapHandler.mapManager;
  if (!canvasRef.current || !contextRef.current) return;
  if (selectedComponent.type != SelectedComponentType.mapElement) return;
  const component = selectedComponent.component as MapElementInfo;
  const mapManager = totalElementHandler.mapHandler.mapManager;
  const [mapPointX, mapPointY] = getMapPoint(e.clientX, e.clientY, canvasRef.current, mapManager.blockSize);
  const mapElement = mapManager.map[mapPointY][mapPointX].frame;
  if (component.id === mapElementInfo.objectRemover.id) {
    mapManager.map[mapPointY][mapPointX] = MapFrameClass.loadFrame(mapElementInfo.floor, mapPointX, mapPointY);
    totalScreenManager.facilityManager.deleteByMapPoint(mapPointX, mapPointY);
    totalScreenManager.launcherManager.deleteByMapPoint(mapPointX, mapPointY);
    totalElementHandler.facilityHandler.reDraw();
    totalElementHandler.launcherHandler.reDraw();
    const [energyOutput, evolveFactorOutput] = totalElementHandler.facilityHandler.getCurrentOutput();
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
      mapManager.map[mapPointY][mapPointX].frame.info = component;
      mapManager.map[mapPointY][mapPointX].frame.activate = false;
      setResource((prev) => ({
        ...prev,
        energy: prev.energy - component.energy,
        evolveFactor: prev.evolveFactor - component.gas,
      }));
    }
  }
  totalElementHandler.mapHandler.reDraw();
}

function handleLauncherCreateEvent(
  e: MouseEvent,
  totalScreenManager: TotalScreenManager,
  totalElementHandler: TotalElementHandler,
  selectedComponent: SelectedComponent,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  const { canvasRef, contextRef } = totalElementHandler.mapHandler.mapManager;
  if (!canvasRef.current || !contextRef.current) return;
  if (selectedComponent.type != SelectedComponentType.launcher) return;
  const component = selectedComponent.component as LauncherInfo;
  if (resource.energy < component.energy || resource.evolveFactor < component.gas) return;
  // 캔버스의 경계 상자를 가져옵니다.
  const mapManager = totalElementHandler.mapHandler.mapManager;
  const launcherHandler = totalElementHandler.launcherHandler;
  const [mapPointX, mapPointY] = getMapPoint(e.clientX, e.clientY, canvasRef.current, mapManager.blockSize);
  const mapElement = mapManager.map[mapPointY][mapPointX].frame;
  if (!mapElement.info.tag.turretBase) return;
  setResource((prev) => ({
    ...prev,
    energy: prev.energy - component.energy,
    evolveFactor: prev.evolveFactor - component.gas,
  }));
  if (!component.tag.objectRemover) {
    const launcher = LauncherFrameClass.loadFrame(component, mapPointX, mapPointY);
    if (!launcher) return;
    launcherHandler.manager.objects.push(launcher);
    launcherHandler.reDraw();
  } else {
    totalScreenManager.launcherManager.deleteByMapPoint(mapPointX, mapPointY);
  }
}

export function handleCanvasClickEvent(
  e: MouseEvent,
  totalScreenManager: TotalScreenManager,
  totalElementHandler: TotalElementHandler,
  selectedComponent: SelectedComponent | null,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  if (!selectedComponent || !selectedComponent.component) return;
  handleFacilityCreateEvent(e, totalScreenManager, totalElementHandler, selectedComponent, resource, setResource);
  handleLauncherCreateEvent(e, totalScreenManager, totalElementHandler, selectedComponent, resource, setResource);
  handleMapElementCreateEvent(e, totalScreenManager, totalElementHandler, selectedComponent, resource, setResource);
}

export { SelectedComponentType };
