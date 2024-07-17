import facilityImages from "../../assets/images/facility/facilityImages";
import mapImages from "../../assets/images/map/mapImages";
import { MapElementInfo } from "../map/mapElementInfo";
import { objectType } from "../object/objectInfo";

interface FacilityTag {
  core: boolean;
  energy: boolean;
  evolveFactor: boolean;
  installable: boolean;
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
}

export function isFacilityInfo(obj: FacilityInfo) {
  console.log(obj);
  if (
    obj.type === objectType.facility &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.src === "string" &&
    typeof obj.width === "number" &&
    typeof obj.height === "number" &&
    typeof obj.energy === "number" &&
    typeof obj.evolveFactor === "number"
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
    name: "core",
    src: facilityImages.core,
    width: 2,
    height: 2,
    tag: {
      core: true,
      energy: false,
      evolveFactor: false,
      installable: false,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 5,
    evolveFactorOutput: 2,
  },
  energyFacility: {
    id: 2,
    type: objectType.facility,
    name: "energy facility",
    src: facilityImages.facilityEnergy,
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: true,
      evolveFactor: false,
      installable: true,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 1,
    evolveFactorOutput: 0,
  },
  evolveFactorFacility: {
    id: 3,
    type: objectType.facility,
    name: "evolve facility",
    src: facilityImages.facilityEvolutionFactor,
    width: 1,
    height: 1,
    tag: {
      core: false,
      energy: false,
      evolveFactor: true,
      installable: true,
    },
    energy: -1,
    evolveFactor: -1,
    energyOutput: 0,
    evolveFactorOutput: 1,
  },
};

export default facilityInfo;
