import { ObjectInfo, objectType } from "../object/objectInfo";

export interface ProjectileInfo extends ObjectInfo {
  id: number;
  damage: number;
}

export function getProjectileInfoById(id: number): ProjectileInfo | undefined {
  const projectiles = Object.values(projectileInfo);
  let ret: ProjectileInfo | undefined = undefined;
  projectiles.forEach((obj) => {
    if (id === obj.id) ret = obj;
  });
  return ret;
}

const projectileInfo: Record<string, ProjectileInfo> = {
  lv1: {
    id: 1,
    type: objectType.projectile,
    name: "lv1",
    frameSize: 1,
    damage: 1,
    width: 100,
    height: 15,
  },
};

export default projectileInfo;
