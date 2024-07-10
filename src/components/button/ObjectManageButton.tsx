import style from "../../assets/css/gameScreen.module.css";
import { GamePageButtonType } from "../../util/GamePageButtonType";
import ObjectManageModal from "../modal/objectManageModal";

const ObjectManageButton = ({ setModal, mapInfo }: GamePageButtonType) => {
  function buttonOnclickHandler() {
    setModal(() => {
      return <ObjectManageModal mapInfo={mapInfo} setModal={setModal} />;
    });
  }

  return (
    <div onClick={buttonOnclickHandler}>
      <button>objectManage</button>
    </div>
  );
};

export default ObjectManageButton;
