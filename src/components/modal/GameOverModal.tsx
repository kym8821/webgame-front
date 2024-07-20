import style from '../../assets/css/gameScreen.module.css';
import { Resource } from '../../util/resource';

interface GameOverModalProps {
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
  resetGame: Function;
}

const GameOverModal = ({ setResource, resetGame }: GameOverModalProps) => {
  return (
    <div className={style.gameScreenModalContainer}>
      <div className={style.gameScreenModal}>
        <button
          onClick={() => {
            setResource((prev) => ({ ...prev, health: 100, energy: 0, evolveFactor: 0 }));
            resetGame();
          }}
        >
          restart
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
