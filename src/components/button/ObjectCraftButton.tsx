import style from "../../assets/css/gameScreen.module.css";
import { GamePageButtonType } from "../../util/GamePageButtonType";
import ObjectCraftModal from "../modal/objectCraftModal";

const ObjectCraftButton = ({ setModal, mapInfo }: GamePageButtonType) => {
  function buttonOnclickHandler() {
    setModal(() => <ObjectCraftModal setModal={setModal} mapInfo={mapInfo.map} />);
  }
  return (
    <div onClick={buttonOnclickHandler}>
      <button>ObjectCraft</button>
    </div>
  );
};

export default ObjectCraftButton;
