import facilityImages from '../../assets/images/facility/facilityImages';
import mapImages from '../../assets/images/map/mapImages';
import { MapElementInfo } from '../map/mapElementInfo';
import { objectType } from '../object/objectInfo';

interface FacilityTag {
  core: boolean;
  energy: boolean;
  evolveFactor: boolean;
  installable: boolean;
  objectRemover: boolean;
}

export interface FacilityInfo {
  id: number;
  type: string;
  name: string;
  src: string;
  width: number;
  height: number;
  tag: FacilityTag;
  energy: number;
  evolveFactor: number;
  energyOutput: number;
  evolveFactorOutput: number;
  frameSize: number;
  frames: string[];
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
    src: facilityImages.core1,
    width: 2,
    height: 2,
    tag: {
      core: true,
      energy: false,
      evolveFactor: false,
      installable: false,
      objectRemover: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 5,
    evolveFactorOutput: 1,
    frameSize: 2,
    frames: [facilityImages.core1, facilityImages.core2],
  },
  energy: {
    id: 2,
    type: objectType.facility,
    name: 'energy facility',
    src: facilityImages.energy1,
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: true,
      evolveFactor: false,
      installable: true,
      objectRemover: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 1,
    evolveFactorOutput: 0,
    frameSize: 2,
    frames: [facilityImages.energy1, facilityImages.energy2],
  },
  evolveFactor: {
    id: 3,
    type: objectType.facility,
    name: 'evolve facility',
    src: facilityImages.evolveFactor1,
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: false,
      evolveFactor: true,
      installable: true,
      objectRemover: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 0,
    evolveFactorOutput: 1,
    frameSize: 2,
    frames: [facilityImages.evolveFactor1, facilityImages.evolveFactor2],
  },
  objectRemover: {
    id: 4,
    type: objectType.facility,
    name: 'objectRemover',
    src: mapImages.tile,
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: false,
      evolveFactor: false,
      installable: true,
      objectRemover: true,
    },
    energy: -5,
    evolveFactor: -5,
    energyOutput: 0,
    evolveFactorOutput: 0,
    frameSize: 1,
    frames: [mapImages.tile],
  },
};

export default facilityInfo;
