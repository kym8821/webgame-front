export interface MonsterInfo {
  name: string;
  frameSize: number;
  spawnRate: number;
  width: number;
  height: number;
}

const greenSlime: MonsterInfo = {
  name: "greenSlime",
  frameSize: 2,
  spawnRate: 80,
  width: 100,
  height: 100,
};

const blueSlime: MonsterInfo = {
  name: "blueSlime",
  frameSize: 2,
  spawnRate: 80,
  width: 100,
  height: 100,
};

const skeleton: MonsterInfo = {
  name: "skeleton",
  frameSize: 4,
  spawnRate: 50,
  width: 100,
  height: 120,
};

const monsterInfo = { greenSlime, blueSlime, skeleton };

export default monsterInfo;
