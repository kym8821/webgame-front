import { ReactNode, useEffect, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import mapElementInfo, { MapElementInfo } from "../../util/map/mapElementInfo";
import { objectType } from "../../util/object/objectInfo";
import { ComponentPageNumber, SelectedComponent } from "../../util/SelectedComponent";

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
      type: ComponentPageNumber.mapElement,
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
          <div key={element.id}>
            <img
              src={element.src[0]}
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
  }, [mapElementInfo, selectedComponent]);

  return <div className={style.componentSelector}>{mapElementList}</div>;
};

export default MapComponentSelector;
