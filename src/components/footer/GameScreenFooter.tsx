import { ReactNode, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import ObjectManageButton from "../button/ObjectManageButton";
import ObjectCraftButton from "../button/ObjectCraftButton";
import { MapManager } from "../../util/map/mapManager";

interface GameScreenFooterType {
  setModal: Function;
  mapInfo: MapManager;
}

const GameScreenFooter = ({ setModal, mapInfo }: GameScreenFooterType) => {
  return (
    <div>
      <div className={style.footer}>
        <ObjectManageButton setModal={setModal} mapInfo={mapInfo} />
        <ObjectCraftButton setModal={setModal} mapInfo={mapInfo} />
      </div>
    </div>
  );
};

export default GameScreenFooter;
