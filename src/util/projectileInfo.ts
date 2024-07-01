export interface ProjectileInfo {
  name: string;
  frameSize: number;
  damage: number;
  width: number;
  height: number;
}

const arrow: ProjectileInfo = {
  name: "arrow",
  frameSize: 1,
  damage: 1,
  width: 20,
  height: 100,
};

const projectileInfo = { arrow };

export default projectileInfo;
