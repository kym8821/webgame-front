import FacilityElementHandler from "../util/facility/facilityElementHandler";
import LauncherElementHandler from "../util/launcher/launcherElementHandler";
import MapElementHandler from "../util/map/mapElementHandler";
import MonsterElementHandler from "../util/monster/monsterElementHandler";
import ProjectileElementHandler from "../util/projectile/projectileElementHandler";
import { TotalElementHandler } from "../util/totalElementHandler";
import { TotalScreenManager } from "../util/totalScreenManager";

export function loadTotalElementHandler(totalScreenManager: TotalScreenManager) {
  const mapManager = totalScreenManager.mapManager.manager;
  const facilityHandler = new FacilityElementHandler(totalScreenManager.facilityManager.manager, mapManager);
  const launcherHandler = new LauncherElementHandler(totalScreenManager.launcherManager.manager, mapManager);
  const projectileHandler = new ProjectileElementHandler(totalScreenManager.projectileManager.manager, mapManager);
  const monsterHandler = new MonsterElementHandler(totalScreenManager.monsterManager.manager, mapManager);
  const mapHandler = new MapElementHandler(mapManager);
  const totalElementHandler: TotalElementHandler = {
    facilityHandler: facilityHandler,
    launcherHandler: launcherHandler,
    projectileHandler: projectileHandler,
    monsterHandler: monsterHandler,
    mapHandler: mapHandler,
    redrawScreenLists: [facilityHandler, launcherHandler, projectileHandler, monsterHandler, mapHandler],
    transformScreenLists: [facilityHandler, launcherHandler, projectileHandler, monsterHandler, mapHandler],
  };
  return totalElementHandler;
}
