import mapImages from "../../assets/images/map/mapImages";
import { ObjectDrawer, Position } from "../objectDrawer";
import { getMapInfoById } from "./mapInfo";

function getPosition(x: number, y: number, blockSize: number) {
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

function draw(context: CanvasRenderingContext2D, map: number[][], blockSize: number) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const mapId = map[i][j];
      const currentMapInfo = getMapInfoById(mapId);
      const image = new Image();
      image.src = currentMapInfo.src;
      console.log(currentMapInfo, mapId);
      image.onload = () => {
        const position = getPosition(j, i, blockSize);
        context.save();
        console.log("draw");
        context.translate(position.posX, position.posY);
        context.drawImage(image, 0, 0, blockSize, blockSize);
        context.restore();
      };
    }
  }
}

const mapDrawer: ObjectDrawer = { draw, getPosition };

export default mapDrawer;
