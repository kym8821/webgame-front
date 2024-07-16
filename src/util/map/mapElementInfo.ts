import mapImages from "../../assets/images/map/mapImages";

interface MapElementTag {
  pipe: boolean;
  tile: boolean;
  base: boolean;
  turretBase: boolean;
  facilityBase: boolean;
  core: boolean;
  installable: boolean;
}

export interface MapElementInfo {
  name: string;
  id: number;
  src: string;
  width: number;
  height: number;
  tag: MapElementTag;
  energy: number;
  gas: number;
}

export function isMapElementInfo(obj: MapElementInfo) {
  if (
    typeof obj.name === "string" &&
    typeof obj.id === "number" &&
    typeof obj.src === "string" &&
    typeof obj.width === "number" &&
    typeof obj.height === "number" &&
    obj.tag
  ) {
    return true;
  }
  return false;
}

export function getMapInfoById(id: number) {
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

const mapElementInfo: Record<string, MapElementInfo> = {
  base1: {
    name: "터렛 베이스",
    id: 0,
    width: 1,
    height: 1,
    src: mapImages.base1,
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: true,
      facilityBase: false,
      core: false,
      installable: true,
    },
    energy: 15,
    gas: 15,
  },
  floor: {
    name: "바닥",
    id: 1,
    width: 1,
    height: 1,
    src: mapImages.floor,
    tag: {
      pipe: false,
      tile: true,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: false,
    },
    energy: -1,
    gas: -1,
  },
  ex: {
    name: "에러타일",
    id: 2,
    width: 1,
    height: 1,
    src: mapImages.ex,
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: false,
    },
    energy: -1,
    gas: -1,
  },
  core: {
    name: "코어",
    id: 3,
    width: 1,
    height: 1,
    src: mapImages.floor,
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: true,
      installable: false,
    },
    energy: -1,
    gas: -1,
  },
  tile: {
    name: "타일",
    id: 4,
    width: 1,
    height: 1,
    src: mapImages.tile,
    tag: {
      pipe: false,
      tile: true,
      base: true,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: false,
    },
    energy: 10,
    gas: 10,
  },
  pipe: {
    name: "파이프",
    id: 5,
    width: 1,
    height: 1,
    src: mapImages.pipe_0000,
    tag: {
      pipe: true,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: true,
    },
    energy: 10,
    gas: 5,
  },
  objectRemover: {
    name: "모듈 제거",
    id: 6,
    width: 1,
    height: 1,
    src: mapImages.tile,
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: true,
    },
    energy: 0,
    gas: 0,
  },
};

export default mapElementInfo;
