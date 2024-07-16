import mapImages from "../../assets/images/map/mapImages";
import { MapElementInfo } from "./mapElementInfo";

const facilityInfo: Record<string, MapElementInfo> = {
  core: {
    id: 1,
    name: "core",
    src: mapImages.core,
    width: 2,
    height: 2,
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
};

export default facilityInfo;