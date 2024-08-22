import { ReactNode, useEffect, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import mapElementInfo, { getMapInfoById, isMapElementInfo, MapElementInfo } from "../../util/map/mapElementInfo";
import launcherInfo, { getLauncherInfoById, isLauncherInfo, LauncherInfo } from "../../util/launcher/launcherInfo";
import facilityInfo, { FacilityInfo, getFacilityInfoById, isFacilityInfo } from "../../util/facility/facilityInfo";
import { objectType } from "../../util/object/objectInfo";
import { ComponentPageNumber, SelectedComponent } from "../../util/SelectedComponent";

interface GameObjectSibeBarType {
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
}

function getImageStyle() {
  return {
    width: "5rem",
    height: "5rem",
  } as React.CSSProperties;
}

const GameObjectSideBar = ({ selectedComponent }: GameObjectSibeBarType) => {
  const [sideBarType, setSideBarType] = useState(<div>{objectType.mapElement}</div>);
  const [objectInfo, setObjectInfo] = useState<ReactNode>();

  useEffect(() => {
    if (!selectedComponent || !selectedComponent.component) return;
    console.log(selectedComponent);
    const sc = selectedComponent;
    if (sc.type === ComponentPageNumber.mapElement) {
      const component = getMapInfoById(selectedComponent.component.id);
      setObjectInfo(() => (
        <div>
          <div className={style.sideBarImgContainer}>
            <img src={component.src[0]} className={style.sideBarImg} style={{ aspectRatio: component.width / component.height }} />
          </div>
          <div>{component.name}</div>
          <div>cost : {component.energy}</div>
          <div>gas : {component.gas}</div>
        </div>
      ));
    } else if (sc.type === ComponentPageNumber.launcher) {
      const component = getLauncherInfoById(selectedComponent.component.id);
      if (!component) {
        alert("side bar : invalid launcher info");
        return;
      } else {
        setObjectInfo(() => (
          <div>
            <div className={style.sideBarImgContainer}>
              <img src={component.src[0]} className={style.sideBarImg} style={{ aspectRatio: component.width / component.height }} />
            </div>
            <div>{component.name}</div>
            <div>cost : {component.energy}</div>
            <div>gas : {component.gas}</div>
          </div>
        ));
      }
    } else if (sc.type === ComponentPageNumber.facility) {
      const component = getFacilityInfoById(selectedComponent.component.id);
      if (!component) {
        alert("side bar : invalid facility info");
        return;
      }
      setObjectInfo(() => (
        <div>
          <div className={style.sideBarImgContainer}>
            <img src={component.src[0]} className={style.sideBarImg} style={{ aspectRatio: component.width / component.height }} />
          </div>
          <div>{component.name}</div>
          <div>cost : {component.energy}</div>
          <div>gas : {component.evolveFactor}</div>
        </div>
      ));
    }
    setSideBarType(() => <div>{sc.type}</div>);
  }, [selectedComponent, mapElementInfo, facilityInfo, launcherInfo]);
  return (
    <div className={style.gameObjectSideBar}>
      {sideBarType}
      {objectInfo}
    </div>
  );
};

export default GameObjectSideBar;
