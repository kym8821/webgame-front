export const objectType = {
  monster: 1,
  projectile: 2,
  launcher: 3,
  facility: 4,
  mapElement: 5,
};

export interface ObjectInfo {
  type: number;
  name: string;
  frameSize: number;
  width: number;
  height: number;
  src: string[];
  images: HTMLImageElement[];
}
