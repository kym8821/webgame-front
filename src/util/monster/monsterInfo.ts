import { ObjectInfo, objectType } from '../objectInfo';

export interface MonsterInfo extends ObjectInfo {
  lifePoint: number;
  spawnRate: number;
}

const monsterInfo: Record<string, MonsterInfo> = {
  greenSlime: {
    type: objectType.monster,
    name: 'greenSlime',
    frameSize: 2,
    spawnRate: 80,
    width: 100,
    height: 100,
    lifePoint: 10,
  },

  blueSlime: {
    type: objectType.monster,
    name: 'blueSlime',
    frameSize: 2,
    spawnRate: 80,
    width: 100,
    height: 100,
    lifePoint: 12,
  },

  skeleton: {
    type: objectType.monster,
    name: 'skeleton',
    frameSize: 4,
    spawnRate: 50,
    width: 100,
    height: 120,
    lifePoint: 20,
  },
};

export default monsterInfo;
