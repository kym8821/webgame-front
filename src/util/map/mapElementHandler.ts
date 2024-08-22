import { MapManager } from "./mapManager";
import mapCoordConverter from "./mapCoordConverter";
import ObjectElementHandler from "../object/ObjectElementHandler";
import { MapFrame, MapFrameClass } from "./mapFrame";

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

export default class MapElementHandler implements ObjectElementHandler<MapManager> {
  manager: MapManager;
  mapManager: undefined;

  constructor(manager: MapManager) {
    this.manager = manager;
  }

  getPipe = (x: number, y: number) => {
    let pipe = "";
    const map = this.manager.map;
    for (let i = 0; i < 4; i++) {
      const [dx, dy] = [x + delta[i][0], y + delta[i][1]];
      if (dx < 0 || dy < 0 || dx >= map[0].length || dy >= map.length) {
        pipe = pipe + "0";
        continue;
      }
      const elementInfo = map[dy][dx].frame.info;
      if (!elementInfo.tag.tile) {
        pipe = pipe + "1";
      } else {
        pipe = pipe + "0";
      }
    }
    return `pipe_${pipe}`;
  };

  activateObject = (corePos: MapPosition[]) => {
    const map = this.manager.map;
    const visit: boolean[][] = new Array(map.length);
    const stack: MapPosition[] = [];
    for (let i = 0; i < map.length; i++) {
      visit[i] = new Array(map[i].length);
      for (let j = 0; j < map[i].length; j++) {
        visit[i][j] = false;
        if (map[i][j].frame.info.tag.core) map[i][j].frame.activate = true;
        else map[i][j].frame.activate = false;
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
        const mapElement = map[nn.y][nn.x].frame.info;
        if (mapElement.tag.pipe) stack.push(nn);
        if (mapElement.tag.facilityBase || mapElement.tag.turretBase || mapElement.tag.core) {
          map[nn.y][nn.x].frame.activate = true;
        }
      }
    }
  };

  private drawAll = (callback: Function) => {
    if (!this.manager.canvasRef || !this.manager.contextRef || !this.manager.canvasRef.current || !this.manager.contextRef.current) return;
    const context = this.manager.contextRef.current;
    const canvas = this.manager.canvasRef.current;
    if (!context || !canvas) return;
    const map = this.manager.map;
    const blockSize = this.manager.blockSize;
    const corePos: MapPosition[] = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const mapFrame = map[i][j].frame;
        if (mapFrame.info.images.length === 0) continue;
        const mapInfo = mapFrame.info;
        const position = mapCoordConverter.mapToCanvasCoord(j, i, blockSize);
        context.save();
        context.translate(position.posX, position.posY);
        context.drawImage(mapFrame.info.images[0], 0, 0, mapInfo.width * blockSize, mapInfo.height * blockSize);
        context.restore();
        callback(mapFrame, corePos);
      }
    }
    this.activateObject(corePos);
  };

  animate = () => {};

  drawNext = () => {
    const callback = (mapFrame: MapFrame, corePos: MapPosition[]) => {
      const mapInfo = mapFrame.info;
      if (mapInfo.tag.pipe) {
        // const pipeId = this.getPipe(j, i);
        // src = mapImages[pipeId];
      } else if (mapInfo.tag.core) {
        const pos: MapPosition = { x: mapFrame.mapPointX, y: mapFrame.mapPointY };
        corePos.push(pos);
      }
    };
    this.drawAll(callback);
  };

  reDraw = () => {
    const callback = (mapFrame: MapFrame, corePos: MapPosition[]) => {
      const mapInfo = mapFrame.info;
      if (mapInfo.tag.pipe) {
        // const pipeId = this.getPipe(j, i);
        // src = mapImages[pipeId];
      } else if (mapInfo.tag.core) {
        const pos: MapPosition = { x: mapFrame.mapPointX, y: mapFrame.mapPointY };
        corePos.push(pos);
      }
    };
    this.drawAll(callback);
  };
}
