import { ReactNode, useEffect, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import mapElementInfo, { getMapInfoById, MapElementInfo } from "../../util/map/mapElementInfo";
import { MapManager } from "../../util/map/mapManager";
import { mapScreenHandler } from "../gameScreen/MapScreen";

interface MapComponentDrawerType {
  mapInfo: MapManager;
  selectedComponent: MapElementInfo | null;
}

const MapComponentDrawer = ({ mapInfo, selectedComponent }: MapComponentDrawerType) => {
  const [mapJsxElement, setMapJsxElement] = useState<ReactNode[]>();

  const mapComponentCreateHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, x: number, y: number) => {
    console.log(selectedComponent);
    if (!selectedComponent) return;
    const componentContainer = e.target as HTMLImageElement;
    const newComponentInfo = getMapInfoById(selectedComponent.id); // 수정된 부분
    componentContainer.attributes[0].value = newComponentInfo.src;
    componentContainer.attributes[1].value = newComponentInfo.id.toString();

    mapInfo.map[y][x] = newComponentInfo.id;
    if (mapScreenHandler.defaultMapElementHandler) mapScreenHandler.defaultMapElementHandler.draw(mapInfo.map);
  };

  useEffect(() => {
    const map = mapInfo.map;
    const newMapElements: any[] = [];
    const gap = 0.1;
    const width = (42 - gap * map[0].length) / map[0].length;
    const mapElementStyle: React.CSSProperties = {
      width: `${width}vw`,
      height: `${width}vw`,
      margin: `${gap / 2}vw`,
    };
    for (let i = 0; i < map.length; i++) {
      newMapElements.push(
        <div className={style.mapContainer} key={`map${i}`}>
          {map[i].map((_, idx) => {
            const currnetComponentInfo = getMapInfoById(map[i][idx]);
            return (
              <img
                key={idx} // 추가된 부분: key 속성 추가
                src={currnetComponentInfo.src}
                alt={currnetComponentInfo.id.toString()}
                style={mapElementStyle}
                onClick={(e) => mapComponentCreateHandler(e, idx, i)}
              />
            );
          })}
        </div>
      );
    }
    setMapJsxElement(() => newMapElements);
    console.log(newMapElements);
  }, [mapInfo.map, selectedComponent]); // 수정된 부분: selectedComponent를 의존성 배열에 추가

  return <div className={style.componentDrawer}>{mapJsxElement}</div>;
};

export default MapComponentDrawer;
