import { ReactNode, useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import ObjectManageButton from "../button/ObjectManageButton";
import ObjectCraftButton from "../button/ObjectCraftButton";
import { MapInfo } from "../../util/map/mapInfo";

interface GameScreenFooterType {
  setModal: Function;
  mapInfo: MapInfo;
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
