export const objectType = {
  monster: "monster",
  projectile: "projectile",
  launcher: "launcher",
  facility: "facility",
  mapElement: "mapElement",
};

export interface ObjectInfo {
  type: string;
  name: string;
  frameSize: number;
  width: number;
  height: number;
}
