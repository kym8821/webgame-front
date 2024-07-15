import { ReactNode, useEffect, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { getMapInfoById, isMapElementInfo, MapElementInfo } from "../../util/map/mapElementInfo";
import { getLauncherInfoById, isLauncherInfo, LauncherInfo } from "../../util/launcher/launcherInfo";
import launcherImages from "../../assets/images/launcher/launcherImages";

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
  const [name, setName] = useState<string>();
  const [image, setImage] = useState<ReactNode>();

  useEffect(() => {
    if (!selectedComponent || !selectedComponent.component) return;
    console.log(selectedComponent);
    const sc = selectedComponent.component;
    if (isMapElementInfo(sc as MapElementInfo)) {
      const component = getMapInfoById(sc.id);
      console.log(component);
      setName(() => component.name);
      setImage(() => <img src={component.src} alt={component.name} style={getImageStyle()} />);
    } else if (isLauncherInfo(sc as LauncherInfo)) {
      const component = getLauncherInfoById(sc.id);
      if (!component) {
        alert("side bar : invalid launcher info");
        return;
      } else {
        setName(() => component.name);
        setImage(() => <img src={launcherImages[component.name]} style={getImageStyle()} />);
      }
    }
  }, [selectedComponent]);
  return (
    <div className={style.gameObjectSideBar}>
      {/* {selectedComponent?.component as MapElementInfo} */}
      {name}
      {image}
    </div>
  );
};

export default GameObjectSideBar;
