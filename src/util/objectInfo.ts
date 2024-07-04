export const objectType = {
  monster: 'monster',
  projectile: 'projectile',
  launcher: 'launcher',
};

export interface ObjectInfo {
  type: string;
  name: string;
  frameSize: number;
  width: number;
  height: number;
}
