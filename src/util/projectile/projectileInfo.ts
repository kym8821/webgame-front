import { ObjectInfo, objectType } from "../object/objectInfo";

export interface ProjectileInfo extends ObjectInfo {
  damage: number;
}

const projectileInfo: Record<string, ProjectileInfo> = {
  lv1: {
    type: objectType.projectile,
    name: "lv1",
    frameSize: 1,
    damage: 1,
    width: 100,
    height: 15,
  },
};

export default projectileInfo;
