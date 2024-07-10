import { useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import { MapManager } from "../../util/map/mapManager";
import MapComponentDrawer from "../button/MapComponentDrawer";
import MapComponentSelector from "../button/MapComponentSelector";
import { MapElementInfo } from "../../util/map/mapElementInfo";

interface ModalType {
  mapInfo: MapManager;
  setModal: Function;
}

const ObjectManageModal = ({ mapInfo, setModal }: ModalType) => {
  const [selectedComponent, setSelectedComponent] = useState<MapElementInfo | null>(null);

  function modalHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (e.currentTarget !== e.target) return;
    setModal(() => <div></div>);
  }

  return (
    <div className={style.modalContainer} onClick={modalHandler}>
      <div className={style.modal}>
        {mapInfo && <MapComponentDrawer mapInfo={mapInfo} selectedComponent={selectedComponent} />}
        {/* <MapComponentSelector selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} /> */}
      </div>
    </div>
  );
};

export default ObjectManageModal;
