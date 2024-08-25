import facilityImages from '../../assets/images/facility/facilityImages';
import mapImages from '../../assets/images/map/mapImages';
import { ObjectInfo, objectType } from '../object/objectInfo';

interface FacilityTag {
  core: boolean;
  energy: boolean;
  evolveFactor: boolean;
  installable: boolean;
  objectRemover: boolean;
  pipe: boolean;
}

export interface FacilityInfo extends ObjectInfo {
  id: number;
  tag: FacilityTag;
  energy: number;
  evolveFactor: number;
  energyOutput: number;
  evolveFactorOutput: number;
}

export function isFacilityInfo(obj: FacilityInfo) {
  console.log(obj);
  if (
    obj.type === objectType.facility &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.src === 'string' &&
    typeof obj.width === 'number' &&
    typeof obj.height === 'number' &&
    typeof obj.energy === 'number' &&
    typeof obj.evolveFactor === 'number'
  ) {
    return true;
  }
  return false;
}

export function getFacilityInfoById(id: number): FacilityInfo | undefined {
  const facilities = Object.values(facilityInfo);
  let ret: FacilityInfo | undefined = undefined;
  facilities.forEach((element) => {
    if (element.id === id) {
      ret = element;
    }
  });
  return ret;
}

const facilityInfo: Record<string, FacilityInfo> = {
  core: {
    id: 1,
    type: objectType.facility,
    name: 'core',
    width: 2,
    height: 2,
    tag: {
      core: true,
      energy: false,
      evolveFactor: false,
      installable: false,
      objectRemover: false,
      pipe: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 5,
    evolveFactorOutput: 1,
    frameSize: 2,
    src: [facilityImages.core1, facilityImages.core2],
    images: [],
  },
  energy: {
    id: 2,
    type: objectType.facility,
    name: 'energy facility',
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: true,
      evolveFactor: false,
      installable: true,
      objectRemover: false,
      pipe: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 1,
    evolveFactorOutput: 0,
    frameSize: 2,
    src: [facilityImages.energy1, facilityImages.energy2],
    images: [],
  },
  evolveFactor: {
    id: 3,
    type: objectType.facility,
    name: 'evolve facility',
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: false,
      evolveFactor: true,
      installable: true,
      objectRemover: false,
      pipe: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 0,
    evolveFactorOutput: 1,
    frameSize: 2,
    src: [facilityImages.evolveFactor1, facilityImages.evolveFactor2],
    images: [],
  },
  objectRemover: {
    id: 4,
    type: objectType.facility,
    name: 'objectRemover',
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: false,
      evolveFactor: false,
      installable: true,
      objectRemover: true,
      pipe: false,
    },
    energy: -5,
    evolveFactor: -5,
    energyOutput: 0,
    evolveFactorOutput: 0,
    frameSize: 1,
    src: [mapImages.tile],
    images: [],
  },
  pipe: {
    id: 5,
    type: objectType.facility,
    name: 'pipe',
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: false,
      evolveFactor: false,
      installable: true,
      objectRemover: false,
      pipe: true,
    },
    energy: 5,
    evolveFactor: 5,
    energyOutput: 0,
    evolveFactorOutput: 0,
    frameSize: 1,
    src: [
      facilityImages.pipe_0000,
      facilityImages.pipe_0001,
      facilityImages.pipe_0010,
      facilityImages.pipe_0011,
      facilityImages.pipe_0100,
      facilityImages.pipe_0101,
      facilityImages.pipe_0110,
      facilityImages.pipe_0111,
      facilityImages.pipe_1000,
      facilityImages.pipe_1001,
      facilityImages.pipe_1010,
      facilityImages.pipe_1011,
      facilityImages.pipe_1100,
      facilityImages.pipe_1101,
      facilityImages.pipe_1110,
      facilityImages.pipe_1111,
    ],
    images: [],
  },
};

export default facilityInfo;
