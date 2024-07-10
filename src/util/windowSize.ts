interface WindowSize {
  width: number;
  height: number;
}

const defaultWindowSize: WindowSize = {
  width: 1920 * 0.8,
  height: 1080 * 0.8,
};

export function getCurrentBlockSize(canvasWidth: number, map: number[][]) {
  if (map.length <= 0) return undefined;
  const currentWindowSize = canvasWidth / map[0].length;
  return currentWindowSize;
}

export default defaultWindowSize;
