export interface Coordinate {
  posX: number;
  posY: number;
}

export interface Position extends Coordinate {
  boundX: number;
  boundY: number;
  width: number;
  height: number;
}
