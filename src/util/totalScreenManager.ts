import { FacilityManagerClass } from "./facility/facilityManager";
import { LauncherManagerClass } from "./launcher/launcherManager";
import { MapManagerClass } from "./map/mapManager";
import { MonsterManagerClass } from "./monster/monsterManager";
import { CanvasManager } from "./object/objectManager/CanvasManager";
import { CanvasObjectManager, CanvasObjectManagerClass, CanvasObjectManagerClassType } from "./object/objectManager/canvasObjectManager";
import { ProjectileManagerClass } from "./projectile/projectileManager";

export interface TotalScreenManager {
  userScreenManager: CanvasManager;
  mapManager: MapManagerClass;
  facilityManager: FacilityManagerClass;
  launcherManager: LauncherManagerClass;
  monsterManager: MonsterManagerClass;
  projectileManager: ProjectileManagerClass;
  resetManagers: CanvasObjectManagerClass<any, any, any, any>[];
  transformableManagers: CanvasObjectManagerClass<any, any, any, any>[];
}
