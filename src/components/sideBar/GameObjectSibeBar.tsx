import { ReactNode, useEffect, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { getMapInfoById, isMapElementInfo, MapElementInfo } from "../../util/map/mapElementInfo";
import { getLauncherInfoById, isLauncherInfo, LauncherInfo } from "../../util/launcher/launcherInfo";
import { FacilityInfo, getFacilityInfoById, isFacilityInfo } from "../../util/facility/facilityInfo";
import { objectType } from "../../util/object/objectInfo";

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
    const sc = selectedComponent.component;
    if (isMapElementInfo(sc as MapElementInfo)) {
      const component = getMapInfoById(sc.id);
      setObjectInfo(() => (
        <div>
          <div className={style.sideBarImgContainer}>
            <img src={component.src} className={style.sideBarImg} style={{ aspectRatio: component.width / component.height }} />
          </div>
          <div>{component.name}</div>
          <div>cost : {component.energy}</div>
          <div>gas : {component.gas}</div>
        </div>
      ));
    } else if (isLauncherInfo(sc as LauncherInfo)) {
      const component = getLauncherInfoById(sc.id);
      if (!component) {
        alert("side bar : invalid launcher info");
        return;
      } else {
        setObjectInfo(() => (
          <div>
            <div className={style.sideBarImgContainer}>
              <img src={component.src} className={style.sideBarImg} style={{ aspectRatio: component.width / component.height }} />
            </div>
            <div>{component.name}</div>
            <div>cost : {component.energy}</div>
            <div>gas : {component.gas}</div>
          </div>
        ));
      }
    } else if (isFacilityInfo(sc as FacilityInfo)) {
      const component = getFacilityInfoById(sc.id);
      if (!component) {
        alert("side bar : invalid facility info");
        return;
      }
      console.log(component);
      setObjectInfo(() => (
        <div>
          <div className={style.sideBarImgContainer}>
            <img src={component.src} className={style.sideBarImg} style={{ aspectRatio: component.width / component.height }} />
          </div>
          <div>{component.name}</div>
          <div>cost : {component.energy}</div>
          <div>gas : {component.evolveFactor}</div>
        </div>
      ));
    }
    setSideBarType(() => <div>{sc.type}</div>);
  }, [selectedComponent]);
  return (
    <div className={style.gameObjectSideBar}>
      {sideBarType}
      {objectInfo}
    </div>
  );
};

export default GameObjectSideBar;
