import { ReactNode, useEffect, useState } from "react";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { SelectedComponentType } from "../../util/canvasClickEvent";
import style from "../../assets/css/gameScreen.module.css";
import facilityInfo, { FacilityInfo } from "../../util/facility/facilityInfo";

interface ComponentSelectorType {
  // selectedComponent: React.MutableRefObject<SelectedComponent | null>;
  selectedComponent: SelectedComponent | null;
  setSelectedComponent: Function;
}

const FacilitySelector = ({ selectedComponent, setSelectedComponent }: ComponentSelectorType) => {
  const [facilityList, setFacilityList] = useState<ReactNode[]>([]);

  function handleClickedObject(element: FacilityInfo) {
    const sc: SelectedComponent = {
      component: element,
      type: SelectedComponentType.facility,
    };
    // selectedComponent.current = sc;
    setSelectedComponent(() => sc);
  }

  useEffect(() => {
    const facilityElements = Object.values(facilityInfo);
    const newFacilityList: ReactNode[] = [];
    const gap = 0.1;
    const length = 5;
    const width = (18 - gap * length) / length;
    const mapElementStyle: React.CSSProperties = {
      width: `${width}vw`,
      height: `${width}vw`,
      aspectRatio: 1,
      margin: `${gap / 2}vw`,
    };
    facilityElements.forEach((element, idx) => {
      if (element.tag.installable) {
        newFacilityList.push(
          <div>
            <img
              src={element.src}
              alt={element.name}
              style={mapElementStyle}
              key={element.name}
              onClick={(e) => {
                handleClickedObject(element);
              }}
            />
          </div>
        );
      }
    });
    setFacilityList(() => newFacilityList);
  }, []);

  return <div className={style.componentSelector}>{facilityList}</div>;
};

export default FacilitySelector;
