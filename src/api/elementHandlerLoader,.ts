import FacilityElementHandler from "../util/facility/facilityElementHandler";
import LauncherElementHandler from "../util/launcher/launcherElementHandler";
import MapElementHandler from "../util/map/mapElementHandler";
import MonsterElementHandler from "../util/monster/monsterElementHandler";
import ProjectileElementHandler from "../util/projectile/projectileElementHandler";
import { TotalElementHandler } from "../util/totalElementHandler";
import { TotalScreenManager } from "../util/totalScreenManager";

export function useTotalElementHandler(totalScreenManager: TotalScreenManager) {
  const mapManager = totalScreenManager.mapManager.manager;
  const totalElementHandler: TotalElementHandler = {
    facilityHandler: new FacilityElementHandler(totalScreenManager.facilityManager.manager, mapManager),
    launcherHandler: new LauncherElementHandler(totalScreenManager.launcherManager.manager, mapManager),
    projectileHandler: new ProjectileElementHandler(totalScreenManager.projectileManager.manager, mapManager),
    monsterHandler: new MonsterElementHandler(totalScreenManager.monsterManager.manager, mapManager),
    mapHandler: new MapElementHandler(mapManager),
  };
  return totalElementHandler;
}
