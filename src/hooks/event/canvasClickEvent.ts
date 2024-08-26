import { LauncherInfo } from '../../util/launcher/launcherInfo';
import mapCoordConverter from '../../util/map/mapCoordConverter';
import mapElementInfo, { MapElementInfo } from '../../util/map/mapElementInfo';
import { FacilityInfo } from '../../util/facility/facilityInfo';
import { Resource } from '../../util/resource';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { FacilityFrameClass } from '../../util/facility/facilityFrame';
import { MapFrameClass } from '../../util/map/mapFrame';
import { TotalScreenManager } from '../../util/totalScreenManager';
import { LauncherFrameClass } from '../../util/launcher/launcherFrame';
import { objectType } from '../../util/object/objectInfo';
import { ComponentPageNumber, SelectedComponent } from '../../util/SelectedComponent';
import { MapManager } from '../../util/map/mapManager';

function getMapPoint(clientX: number, clientY: number, canvas: HTMLCanvasElement, mapManager: MapManager) {
  const rect = canvas.getBoundingClientRect();
  const [canvasPointX, canvasPointY] = [clientX - rect.left, clientY - rect.top];
  console.log(
    canvasPointX,
    canvasPointY,
    mapManager.transformInfo,
    mapManager.blockSize,
    mapCoordConverter.canvasToMapCoord(canvasPointX, canvasPointY, mapManager)
  );
  return mapCoordConverter.canvasToMapCoord(canvasPointX, canvasPointY, mapManager);
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
  if (!canvasRef || !contextRef || !canvasRef.current || !contextRef.current) return;
  if (selectedComponent.type !== ComponentPageNumber.facility) return;
  const component = selectedComponent.component as FacilityInfo;
  const facilities = totalElementHandler.facilityHandler.manager.objects;
  const mapManager = totalElementHandler.mapHandler.manager;
  const [mapPointX, mapPointY] = getMapPoint(e.clientX, e.clientY, canvasRef.current, mapManager);
  if (resource.energy < component.energy || resource.evolveFactor < component.evolveFactor) return;
  facilities.push(FacilityFrameClass.loadFrame(component, mapPointX, mapPointY));
  mapManager.map[mapPointY][mapPointX].frame.empty = false;
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
  totalElementHandler.facilityHandler.drawNext();
}

function handleMapElementCreateEvent(
  e: MouseEvent,
  totalScreenManager: TotalScreenManager,
  totalElementHandler: TotalElementHandler,
  selectedComponent: SelectedComponent,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  const { canvasRef, contextRef } = totalElementHandler.mapHandler.manager;
  if (!canvasRef || !contextRef || !canvasRef.current || !contextRef.current) return;
  if (selectedComponent.type != ComponentPageNumber.mapElement) return;
  const component = selectedComponent.component as MapElementInfo;
  const mapManager = totalElementHandler.mapHandler.manager;
  const [mapPointX, mapPointY] = getMapPoint(e.clientX, e.clientY, canvasRef.current, mapManager);
  if (resource.energy < component.energy || resource.evolveFactor < component.gas) return;
  mapManager.map[mapPointY][mapPointX] = MapFrameClass.loadFrame(component, mapPointX, mapPointY);
  setResource((prev) => ({
    ...prev,
    energy: prev.energy - component.energy,
    evolveFactor: prev.evolveFactor - component.gas,
  }));
  totalElementHandler.mapHandler.drawNext();
}

function handleLauncherCreateEvent(
  e: MouseEvent,
  totalScreenManager: TotalScreenManager,
  totalElementHandler: TotalElementHandler,
  selectedComponent: SelectedComponent,
  resource: Resource,
  setResource: React.Dispatch<React.SetStateAction<Resource>>
) {
  const { canvasRef, contextRef } = totalElementHandler.mapHandler.manager;
  if (!canvasRef || !contextRef || !canvasRef.current || !contextRef.current) return;
  if (selectedComponent.type != ComponentPageNumber.launcher) return;
  const component = selectedComponent.component as LauncherInfo;
  if (resource.energy < component.energy || resource.evolveFactor < component.gas) return;
  const mapManager = totalElementHandler.mapHandler.manager;
  const launcherHandler = totalElementHandler.launcherHandler;
  const [mapPointX, mapPointY] = getMapPoint(e.clientX, e.clientY, canvasRef.current, mapManager);
  const launcher = LauncherFrameClass.loadFrame(component, mapPointX, mapPointY);
  if (!launcher) return;
  launcherHandler.manager.objects.push(launcher);
  setResource((prev) => ({
    ...prev,
    energy: prev.energy - component.energy,
    evolveFactor: prev.evolveFactor - component.gas,
  }));
  launcherHandler.drawNext(totalElementHandler.monsterHandler.manager.objects);
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
