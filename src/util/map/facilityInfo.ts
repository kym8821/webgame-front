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
      turretBase: false,
      facilityBase: false,
      core: true,
      installable: false,
    },
  },
};

export default facilityInfo;
