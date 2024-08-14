import style from "../../assets/css/gameScreen.module.css";
import systemImages from "../../assets/images/system/systemImages";
import MapComponentSelector from "../selector/MapComponentSelector";
import LauncherSelector from "../selector/LauncherSelector";
import { SelectedComponent } from "../../pages/gamePage/GamePage";
import { SelectedComponentType } from "../../util/canvasClickEvent";
import FacilitySelector from "../selector/FacilitySelector";

interface GameObjectFooterType {
  page: number;
  setPage: Function;
  minPage: number;
  maxPage: number;
  selectedComponent: SelectedComponent | null;
  setSelectedComponent: Function;
  // resource: Resource;
  // setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const GameObjectFooter = ({ page, setPage, minPage, maxPage, selectedComponent, setSelectedComponent }: GameObjectFooterType) => {
  function handlePage(delta: number) {
    if (page + delta < minPage || page + delta > maxPage) return;
    setPage((prev: number) => prev + delta);
  }

  return (
    <div className={style.gameScreenFooter}>
      <img src={systemImages.pointerLeft} className={style.pointer} onClick={(e) => handlePage(-1)} />
      {page === SelectedComponentType.mapElement && (
        <MapComponentSelector selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />
      )}
      {page === SelectedComponentType.launcher && (
        <LauncherSelector selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />
      )}
      {page === SelectedComponentType.facility && (
        <FacilitySelector selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />
      )}
      <img src={systemImages.pointerRight} className={style.pointer} onClick={(e) => handlePage(1)} />
    </div>
  );
};

export default GameObjectFooter;
