import { ReactNode, useEffect, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import mapElementInfo, { getMapInfoById, MapElementInfo } from "../../util/map/mapElementInfo";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { SelectedComponentType } from "../../util/canvasClickEvent";

interface ComponentSelectorType {
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  setSelectedComponent: Function;
}

const MapComponentSelector = ({ selectedComponent, setSelectedComponent }: ComponentSelectorType) => {
  const [mapElementList, setMapElementList] = useState<ReactNode[]>();

  function handleClickedObject(element: MapElementInfo) {
    const sc: SelectedComponent = {
      component: element,
      type: SelectedComponentType.mapElement,
    };
    // selectedComponent.current = sc;
    setSelectedComponent(() => sc);
  }

  useEffect(() => {
    const mapComponents = Object.values(mapElementInfo);
    const gap = 0.1;
    const length = 5;
    const width = (18 - gap * length) / length;
    // console.log(width);
    const mapElementStyle: React.CSSProperties = {
      width: `${width}vw`,
      height: `${width}vw`,
      margin: `${gap / 2}vw`,
    };
    const newMapElementList: ReactNode[] = [];
    mapComponents.forEach((element, idx) => {
      if (element.tag.installable) {
        newMapElementList.push(
          <div key={element.name}>
            <img
              src={element.src}
              alt={element.id.toString()}
              style={mapElementStyle}
              key={element.id}
              onClick={() => {
                handleClickedObject(element);
              }}
            />
          </div>
        );
      }
    });
    setMapElementList(() => newMapElementList);
  }, []);

  return <div className={style.componentSelector}>{mapElementList}</div>;
};

export default MapComponentSelector;
