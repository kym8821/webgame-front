import { FacilityInfo } from "./facility/facilityInfo";
import { LauncherInfo } from "./launcher/launcherInfo";
import { MapElementInfo } from "./map/mapElementInfo";

export interface SelectedComponent {
  component: MapElementInfo | LauncherInfo | FacilityInfo | null;
  type: number;
}

const ComponentPageNumber = {
  mapElement: 1,
  launcher: 2,
  facility: 3,
};

export { ComponentPageNumber };
