import { ObjectInfo, objectType } from '../objectInfo';

export interface ProjectileInfo extends ObjectInfo {
  damage: number;
}

const projectileInfo: Record<number, ProjectileInfo> = {
  1: {
    type: objectType.projectile,
    name: 'lv1',
    frameSize: 1,
    damage: 1,
    width: 20,
    height: 100,
  },
};

export default projectileInfo;
