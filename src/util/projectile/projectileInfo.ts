import { ObjectInfo, objectType } from "../objectInfo";

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
    height: 20,
  },
};

export default projectileInfo;