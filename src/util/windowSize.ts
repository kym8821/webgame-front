interface WindowSize {
  width: number;
  height: number;
}

const defaultWindowSize: WindowSize = {
  width: 1920 * 0.8,
  height: 1080 * 0.8,
};

export function getCurrentBlockSize(canvasWidth: number, canvasHeight: number, map: number[][]) {
  if (map.length <= 0) return undefined;
  // const mapLength = map[0].length > 20 ? 20 : map[0].length;
  // const mapLength = map[0].length;
  const currentWindowSize =
    map[0].length / map.length > 2 ? canvasHeight / Math.min(10, map.length) : canvasWidth / Math.min(20, map[0].length);
  // const currentWindowSize = canvasWidth / mapLength;
  return currentWindowSize;
}

export default defaultWindowSize;
