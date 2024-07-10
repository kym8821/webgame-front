import { Position } from "../Position";
import { getMapInfoById } from "./mapElementInfo";

function MapToCanvasCoord(x: number, y: number, blockSize: number) {
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

function draw(context: CanvasRenderingContext2D, map: number[][], blockSize: number) {
  console.log(blockSize);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const mapId = map[i][j];
      if (mapId < 0) continue;
      const currentMapInfo = getMapInfoById(mapId);
      const image = new Image();
      image.src = currentMapInfo.src;
      image.onload = () => {
        const position = MapToCanvasCoord(j, i, blockSize);
        context.save();
        context.translate(position.posX, position.posY);
        context.drawImage(image, 0, 0, blockSize * currentMapInfo.width, blockSize * currentMapInfo.height);
        context.restore();
      };
    }
  }
}

const mapDrawer = { draw, MapToCanvasCoord, canvasToMapCoord };

export default mapDrawer;
