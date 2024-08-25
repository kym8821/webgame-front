import mapImages from '../../assets/images/map/mapImages';
import { ObjectInfo, objectType } from '../object/objectInfo';

interface MapElementTag {
  pipe: boolean;
  tile: boolean;
  base: boolean;
  turretBase: boolean;
  facilityBase: boolean;
  core: boolean;
  installable: boolean;
}

export interface MapElementInfo extends ObjectInfo {
  id: number;
  tag: MapElementTag;
  energy: number;
  gas: number;
}

export function isMapElementInfo(obj: MapElementInfo) {
  if (
    obj.type === objectType.mapElement &&
    typeof obj.name === 'string' &&
    typeof obj.id === 'number' &&
    typeof obj.src === 'string' &&
    typeof obj.width === 'number' &&
    typeof obj.height === 'number' &&
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
  if (!ret) return mapElementInfo['ex'];
  return ret;
}

const mapElementInfo: Record<string, MapElementInfo> = {
  turretBase: {
    images: [],
    frameSize: 1,
    name: '터렛 베이스',
    type: objectType.mapElement,
    id: 0,
    width: 1,
    height: 1,
    src: [mapImages.base1],
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: true,
      facilityBase: false,
      core: false,
      installable: true,
    },
    energy: 10,
    gas: 10,
  },
  floor: {
    images: [],
    frameSize: 1,
    name: '바닥',
    type: objectType.mapElement,
    id: 1,
    width: 1,
    height: 1,
    src: [mapImages.floor],
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
    images: [],
    frameSize: 1,
    name: '에러타일',
    type: objectType.mapElement,
    id: 2,
    width: 1,
    height: 1,
    src: [mapImages.ex],
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
    images: [],
    frameSize: 1,
    name: '코어',
    type: objectType.mapElement,
    id: 3,
    width: 1,
    height: 1,
    src: [mapImages.tile_pipe],
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
    images: [],
    frameSize: 1,
    name: '타일',
    type: objectType.mapElement,
    id: 4,
    width: 1,
    height: 1,
    src: [mapImages.tile],
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
    images: [],
    frameSize: 1,
    name: '파이프',
    type: objectType.mapElement,
    id: 5,
    width: 1,
    height: 1,
    src: [
      mapImages.pipe_0000,
      mapImages.pipe_0001,
      mapImages.pipe_0010,
      mapImages.pipe_0011,
      mapImages.pipe_0100,
      mapImages.pipe_0101,
      mapImages.pipe_0110,
      mapImages.pipe_0111,
      mapImages.pipe_1000,
      mapImages.pipe_1001,
      mapImages.pipe_1010,
      mapImages.pipe_1011,
      mapImages.pipe_1100,
      mapImages.pipe_1101,
      mapImages.pipe_1110,
      mapImages.pipe_1111,
    ],
    tag: {
      pipe: true,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: true,
    },
    energy: 5,
    gas: 5,
  },
  objectRemover: {
    images: [],
    frameSize: 1,
    name: '모듈 제거',
    type: objectType.mapElement,
    id: 6,
    width: 1,
    height: 1,
    src: [mapImages.tile],
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: false,
      core: false,
      installable: true,
    },
    energy: -5,
    gas: -5,
  },
  facilityBase: {
    images: [],
    frameSize: 1,
    name: '시설 베이스',
    type: objectType.mapElement,
    id: 7,
    width: 1,
    height: 1,
    src: [mapImages.ex],
    tag: {
      pipe: false,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: true,
      core: false,
      installable: true,
    },
    energy: 10,
    gas: 10,
  },
  pipeFacilityBase: {
    images: [],
    frameSize: 1,
    name: '감염',
    type: objectType.mapElement,
    id: 8,
    width: 1,
    height: 1,
    src: [mapImages.tile_pipe],
    tag: {
      pipe: true,
      tile: false,
      base: false,
      turretBase: false,
      facilityBase: true,
      core: false,
      installable: true,
    },
    energy: 10,
    gas: 10,
  },
  background: {
    images: [],
    frameSize: 1,
    name: '배경',
    type: objectType.mapElement,
    id: 9,
    width: 1,
    height: 1,
    src: [mapImages.background],
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
};

export default mapElementInfo;
