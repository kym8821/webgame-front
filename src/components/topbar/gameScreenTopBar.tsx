import { Resource } from "../../util/resource";
import style from "../../assets/css/gameScreen.module.css";

interface GameScreenTopBarProps {
  resource: Resource;
}

const GameScreenTopBar = ({ resource }: GameScreenTopBarProps) => {
  return (
    <div className={style.gameScreenTopBar}>
      <div>
        energy : {resource.energy} ( {resource.energyOutput}/sec )
      </div>
      <div>
        evolveFactor : {resource.evolveFactor} ( {resource.evolveFactorOutput}/sec )
      </div>
    </div>
  );
};

export default GameScreenTopBar;
