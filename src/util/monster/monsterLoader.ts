import monsterImages from '../../assets/images/monster/monsterImages';
import MonsterFrame from './monsterFrame';
import monsterInfo, { MonsterInfo } from './monsterInfo';

export function getNextObject() {
  const monsters = Object.values(monsterInfo);
  let totalSpawnRate = 0;
  monsters.forEach((monster) => {
    totalSpawnRate += monster.spawnRate;
  });
  let currentRate = 0,
    expectRate = Math.round(Math.random() * totalSpawnRate);
  for (let i = 0; i < monsters.length; i++) {
    if (expectRate <= currentRate + monsters[i].spawnRate) return monsters[i];
    currentRate += monsters[i].spawnRate;
  }
  return undefined;
}

const loadFrames = (monsterInfo: MonsterInfo) => {
  const monster: MonsterFrame = {
    info: {
      type: monsterInfo.name,
      posX: 1,
      //posY: Math.random() * 3,
      posY: 1,
      frameSize: monsterInfo.frameSize,
      frameNumber: 0,
      width: monsterInfo.width,
      height: monsterInfo.height,
    },
    frame: [],
  };
  for (let i = 0; i < monsterInfo.frameSize; i++) {
    const frame = new Image();
    const src = `${monsterInfo.name}${i}`;
    if (src in monsterImages) {
      frame.src = monsterImages[src];
      monster.frame.push(frame);
    } else {
      console.error(`Frame ${src} not found in monsterImages object.`);
    }
  }
  if (monster.frame.length > 0) return monster;
  return undefined;
};

const monsterLoader = { loadFrames, getNextObject };

export default monsterLoader;
