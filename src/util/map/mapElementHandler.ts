import { Context } from "vm";
import { MapInfo } from "./mapInfo";
import { Position } from "../Position";
import { getMapInfoById } from "./mapElementInfo";

export default class MapElementHandler {
  canvas: HTMLCanvasElement;
  mapInfo: MapInfo;
  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, mapInfo: MapInfo, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.mapInfo = mapInfo;
  }

  getPosition = (x: number, y: number) => {
    const blockSize = this.mapInfo.blockSize;
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
  };

  draw = (map: number[][]) => {
    const blockSize = this.mapInfo.blockSize;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const mapId = map[i][j];
        if (mapId < 0) continue;
        const currentMapInfo = getMapInfoById(mapId);
        const image = new Image();
        image.src = currentMapInfo.src;
        image.onload = () => {
          const position = this.getPosition(j, i);
          this.context.save();
          this.context.translate(position.posX, position.posY);
          this.context.drawImage(image, 0, 0, blockSize * currentMapInfo.width, blockSize * currentMapInfo.height);
          this.context.restore();
        };
      }
    }
  };
}
