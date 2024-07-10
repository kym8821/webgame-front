import { useState } from "react";
import style from "../../assets/css/gameScreen.module.css";
import systemImages from "../../assets/images/system/systemImages";
import MapComponentSelector from "../button/MapComponentSelector";
import { MapElementInfo } from "../../util/map/mapElementInfo";
import LauncherSelector from "../button/LauncherSelector";
import { LauncherInfo } from "../../util/launcher/launcherInfo";
import { SelectedComponent } from "../../pages/gamePage/GamePage";

interface GameObjectFooterType {
  page: number;
  setPage: Function;
  minPage: number;
  maxPage: number;
  selectedComponent: React.MutableRefObject<SelectedComponent | null>;
}

const GameObjectFooter = ({ page, setPage, minPage, maxPage, selectedComponent }: GameObjectFooterType) => {
  function handlePage(delta: number) {
    if (page + delta < minPage || page + delta > maxPage) return;
    setPage((prev: number) => prev + delta);
  }

  return (
    <div className={style.gameScreenFooter}>
      <img src={systemImages.pointerLeft} className={style.pointer} onClick={(e) => handlePage(-1)} />
      {page === 1 && <MapComponentSelector selectedComponent={selectedComponent} />}
      {page === 2 && <LauncherSelector selectedComponent={selectedComponent} />}
      <img src={systemImages.pointerRight} className={style.pointer} onClick={(e) => handlePage(1)} />
    </div>
  );
};

export default GameObjectFooter;
