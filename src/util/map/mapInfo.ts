import mapImages from "../../assets/images/map/mapImages";

interface MapInfo {
  name: string;
  id: number;
  src: string;
}

const mapInfo: Record<string, MapInfo> = {
  floor: {
    name: "floor",
    id: 1,
    src: mapImages.floor,
  },
  base1: {
    name: "base1",
    id: 0,
    src: mapImages.base1,
  },
  ex: {
    name: "ex",
    id: 2,
    src: mapImages.ex,
  },
};

export function getMapInfoById(id: number) {
  const infoList = Object.values(mapInfo);
  let ret = undefined;
  infoList.forEach((info) => {
    if (info.id === id) {
      console.log(id);
      ret = info;
    }
  });
  if (!ret) return mapInfo["ex"];
  return ret;
}

export default mapInfo;
