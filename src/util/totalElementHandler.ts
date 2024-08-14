import FacilityElementHandler from "./facility/facilityElementHandler";
import LauncherElementHandler from "./launcher/launcherElementHandler";
import MapElementHandler from "./map/mapElementHandler";
import MonsterElementHandler from "./monster/monsterElementHandler";
import ProjectileElementHandler from "./projectile/projectileElementHandler";

export interface TotalElementHandler {
  monsterHandler: MonsterElementHandler;
  facilityHandler: FacilityElementHandler;
  projectileHandler: ProjectileElementHandler;
  launcherHandler: LauncherElementHandler;
  mapHandler: MapElementHandler;
}
