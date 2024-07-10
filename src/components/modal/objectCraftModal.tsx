import style from "../../assets/css/gameScreen.module.css";

interface ModalType {
  mapInfo: number[][];
  setModal: Function;
}

const ObjectCraftModal = ({ mapInfo, setModal }: ModalType) => {
  function modalHandler() {
    console.log("click");
    setModal(() => <div></div>);
  }

  return (
    <div className={style.modalContainer} onClick={modalHandler}>
      <div className={style.modal}>objectCraft</div>
    </div>
  );
};

export default ObjectCraftModal;
