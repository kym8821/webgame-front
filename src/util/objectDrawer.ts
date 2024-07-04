export interface Position {
  posX: number;
  posY: number;
  boundX: number;
  boundY: number;
  width: number;
  height: number;
}

export interface ObjectDrawer {
  draw: Function;
  getPosition: Function;
}
