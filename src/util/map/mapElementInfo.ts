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
}

export function isMapElementInfo(obj: MapElementInfo) {
  if (
    typeof obj.name === "string" &&
    typeof obj.id === "number" &&
    typeof obj.src === "string" &&
    typeof obj.width === "number" &&
    typeof obj.height === "number"
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
    name: "base1",
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
  },
  floor: {
    name: "floor",
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
  },
  ex: {
    name: "ex",
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
  },
  core: {
    name: "core",
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
  },
  tile: {
    name: "tile",
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
  },
  pipe: {
    name: "pipe",
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
  },
  objectRemover: {
    name: "objectRemover",
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
  },
};

export default mapElementInfo;
