import { ObjectInfo, objectType } from "../object/objectInfo";

export interface MonsterInfo extends ObjectInfo {
  lifePoint: number;
  spawnRate: number;
  speed: number;
}

export function getNextMonster() {
  const monsterInfoList = Object.values(monsterInfo);
  let totalTicket = 0,
    currentTicket = 0,
    expectedTicket = 0;
  monsterInfoList.forEach((info) => (totalTicket += info.spawnRate));
  expectedTicket = Math.random() % totalTicket;
  for (let i = 0; i < monsterInfoList.length; i++) {
    if (expectedTicket < currentTicket) return monsterInfoList[i];
    currentTicket += monsterInfoList[i].spawnRate;
  }
}

const monsterInfo: Record<string, MonsterInfo> = {
  greenSlime: {
    type: objectType.monster,
    name: "greenSlime",
    frameSize: 2,
    spawnRate: 80,
    width: 100,
    height: 100,
    lifePoint: 10,
    speed: 1,
  },

  blueSlime: {
    type: objectType.monster,
    name: "blueSlime",
    frameSize: 2,
    spawnRate: 80,
    width: 100,
    height: 100,
    lifePoint: 12,
    speed: 1,
  },

  skeleton: {
    type: objectType.monster,
    name: "skeleton",
    frameSize: 4,
    spawnRate: 50,
    width: 100,
    height: 120,
    lifePoint: 20,
    speed: 1,
  },
};

export default monsterInfo;
