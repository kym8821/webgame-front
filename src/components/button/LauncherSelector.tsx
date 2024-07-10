import { ReactNode, useEffect, useState } from "react";
import launcherInfo, { LauncherInfo } from "../../util/launcher/launcherInfo";
import launcherImages from "../../assets/images/launcher/launcherImages";
import { MapElementInfo } from "../../util/map/mapElementInfo";
import { SelectedComponent } from "../../pages/gamePage/GamePage";

interface ComponentSelectorType {
  selectedComponent: React.MutableRefObject<SelectedComponent | null>;
}

const LauncherSelector = ({ selectedComponent }: ComponentSelectorType) => {
  const [launcherList, setLauncherList] = useState<ReactNode[]>([]);

  function handleClickedObject(element: LauncherInfo) {
    const sc: SelectedComponent = {
      component: element,
      type: 2,
    };
    selectedComponent.current = sc;
  }

  useEffect(() => {
    const launcherElements = Object.values(launcherInfo);
    const newMapElementList: ReactNode[] = [];
    const gap = 0.1;
    const length = 5;
    const width = (18 - gap * length) / length;
    const mapElementStyle: React.CSSProperties = {
      width: `${width}vw`,
      height: `${width}vw`,
      margin: `${gap / 2}vw`,
    };
    launcherElements.forEach((element, idx) => {
      const src = launcherImages[element.name];
      newMapElementList.push(
        <div>
          <img
            src={src}
            alt={element.name.toString()}
            style={mapElementStyle}
            key={element.name}
            onClick={(e) => {
              handleClickedObject(element);
            }}
          />
        </div>
      );
    });
    setLauncherList(() => newMapElementList);
  }, []);

  return <div>{launcherList}</div>;
};

export default LauncherSelector;
