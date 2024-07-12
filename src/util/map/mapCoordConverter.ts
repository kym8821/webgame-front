import { Position } from "../Position";

interface MapPosition {
  x: number;
  y: number;
}

const delta = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function mapToCanvasCoord(x: number, y: number, blockSize: number) {
  const [posX, posY] = [x * blockSize, y * blockSize];
  const position: Position = {
    posX: posX,
    posY: posY,
    boundX: posX + blockSize,
    boundY: posY + blockSize,
    width: blockSize,
    height: blockSize,
  };
  return position;
}

function canvasToMapCoord(x: number, y: number, blockSize: number) {
  const [posX, posY] = [Math.floor(x / blockSize), Math.floor(y / blockSize)];
  return [posX, posY];
}

const mapCoordConverter = { mapToCanvasCoord, canvasToMapCoord };

export default mapCoordConverter;
