import mapImages from "../../assets/images/map/mapImages";

export interface MapElementInfo {
  name: string;
  id: number;
  src: string;
  width: number;
  height: number;
}

const mapElementInfo: Record<string, MapElementInfo> = {
  base1: {
    name: "base1",
    id: 0,
    width: 1,
    height: 1,
    src: mapImages.base1,
  },
  floor: {
    name: "floor",
    id: 1,
    width: 1,
    height: 1,
    src: mapImages.floor,
  },
  ex: {
    name: "ex",
    id: 2,
    width: 1,
    height: 1,
    src: mapImages.ex,
  },
  core: {
    name: "core",
    id: 3,
    width: 2,
    height: 2,
    src: mapImages.core,
  },
  tile: {
    name: "tile",
    id: 4,
    width: 1,
    height: 1,
    src: mapImages.tile,
  },
};

const installableMapElements: Record<string, MapElementInfo> = {
  base1: {
    name: "base1",
    id: 0,
    width: 1,
    height: 1,
    src: mapImages.base1,
  },
};

function getMapInfoById(id: number) {
  const infoList = Object.values(mapElementInfo);
  let ret = undefined;
  infoList.forEach((info) => {
    if (info.id === id) {
      ret = info;
    }
  });
  if (!ret) return mapElementInfo["ex"];
  return ret;
}

export { getMapInfoById, installableMapElements };
export default mapElementInfo;
