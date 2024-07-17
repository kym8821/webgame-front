import { MapManager } from "./mapManager";
import { Position } from "../Position";
import mapElementInfo, { getMapInfoById, MapElementInfo } from "./mapElementInfo";
import mapImages from "../../assets/images/map/mapImages";
import mapCoordConverter from "./mapCoordConverter";

interface MapPosition {
  x: number;
  y: number;
}

interface FacilityInfo {
  pos: MapPosition;
  element: MapElementInfo;
}

const delta = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export default class MapElementHandler {
  mapManager: MapManager;

  constructor(mapManager: MapManager) {
    this.mapManager = mapManager;
  }

  getPipe = (x: number, y: number) => {
    let pipe = "";
    const map = this.mapManager.map;
    for (let i = 0; i < 4; i++) {
      const [dx, dy] = [x + delta[i][0], y + delta[i][1]];
      if (dx < 0 || dy < 0 || dx >= map[0].length || dy >= map.length) {
        pipe = pipe + "0";
        continue;
      }
      const elementInfo = map[dy][dx].info;
      if (!elementInfo.tag.tile) {
        pipe = pipe + "1";
      } else {
        pipe = pipe + "0";
      }
    }
    return `pipe_${pipe}`;
  };

  activateObject = (corePos: MapPosition[]) => {
    // init data
    // console.log("activate object");
    // console.log(corePos);
    const map = this.mapManager.map;
    // console.log(map);
    const visit: boolean[][] = new Array(map.length);
    const stack: MapPosition[] = [];
    for (let i = 0; i < map.length; i++) {
      visit[i] = new Array(map[i].length);
      for (let j = 0; j < map[i].length; j++) {
        visit[i][j] = false;
        if (map[i][j].info.tag.core) map[i][j].activate = true;
        else map[i][j].activate = false;
      }
    }
    for (let i = 0; i < corePos.length; i++) {
      const pos = corePos[i];
      visit[pos.y][pos.x] = true;
      stack.push(pos);
    }
    // bfs
    while (stack.length > 0) {
      const cn = stack.pop();
      if (!cn) continue;
      for (let i = 0; i < 4; i++) {
        const nn: MapPosition = { x: cn.x + delta[i][0], y: cn.y + delta[i][1] };
        if (nn.x < 0 || nn.y < 0 || nn.x >= map[0].length || nn.y >= map.length) continue;
        if (visit[nn.y][nn.x]) continue;
        visit[nn.y][nn.x] = true;
        const mapElement = map[nn.y][nn.x].info;
        // console.log(nn);
        if (mapElement.tag.pipe) stack.push(nn);
        if (mapElement.tag.facilityBase || mapElement.tag.turretBase || mapElement.tag.core) {
          // console.log(`activate ${nn.x} ${nn.y}`);
          map[nn.y][nn.x].activate = true;
        }
      }
    }
  };

  draw = (context: CanvasRenderingContext2D) => {
    const map = this.mapManager.map;
    const blockSize = this.mapManager.blockSize;
    const corePos: MapPosition[] = [];
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        // if (map[i][j].info.id === mapElementInfo.ex.id) continue;
        let currentMapInfo = map[i][j].info;
        let src = currentMapInfo.src;
        let { width, height } = currentMapInfo;
        if (currentMapInfo.tag.pipe) {
          const pipeId = this.getPipe(j, i);
          src = mapImages[pipeId];
        } else if (currentMapInfo.tag.core) {
          const pos: MapPosition = { x: j, y: i };
          corePos.push(pos);
          src = mapElementInfo.floor.src;
          [width, height] = [1, 1];
        }
        if (!src) continue;
        const image = new Image();
        image.src = src;
        image.onload = () => {
          const position = mapCoordConverter.mapToCanvasCoord(j, i, blockSize);
          context.save();
          context.translate(position.posX, position.posY);
          context.drawImage(image, 0, 0, blockSize * width, blockSize * height);
          context.restore();
        };
      }
    }
    this.activateObject(corePos);
  };
}
