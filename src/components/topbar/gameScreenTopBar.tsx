import { Resource } from "../../util/resource";
import style from "../../assets/css/gameScreen.module.css";
import { MapManager } from "../../util/map/mapManager";
import mapElementInfo from "../../util/map/mapElementInfo";
import systemImages from "../../assets/images/system/systemImages";

interface GameScreenTopBarProps {
  resource: Resource;
  mapManager: React.MutableRefObject<MapManager>;
}

const cssStyle: Record<string, React.CSSProperties> = {
  healthBarContainer: {
    position: "relative",
    display: "flex",
    width: "15vw",
    height: "2vw",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  healthSection: {
    position: "absolute",
    backgroundColor: "red",
    width: "100%",
    height: "100%",
    top: 0,
    transition: "right 0.5s ease",
  },
  healthState: {
    position: "absolute",
    top: 0,
  },
  separatorImage: {
    position: "absolute",
    width: "0.5vw",
    height: "100%",
    top: 0,
    transition: "left 0.5s ease",
  },
  resourceContainer: { display: "flex", columnGap: "2vw", height: "2vw" },
  resourceStyle: { display: "flex", alignItems: "center", columnGap: "0.5vw" },
  resourceImage: {
    width: "1vw",
    aspectRatio: 1,
  },
};

const GameScreenTopBar = ({ resource, mapManager }: GameScreenTopBarProps) => {
  return (
    <div className={style.gameScreenTopBar} style={{ height: `${mapManager.current.blockSize}px` }}>
      <div style={cssStyle.resourceContainer}>
        <div style={cssStyle.resourceStyle}>
          <img src={systemImages.pointerLeft} style={{ ...cssStyle.resourceImage }} />
          <p>
            {resource.energy} ( {resource.energyOutput}/sec )
          </p>
        </div>
        <div style={cssStyle.resourceStyle}>
          <img src={systemImages.pointerLeft} style={{ ...cssStyle.resourceImage }} />
          <p>
            {resource.evolveFactor} ( {resource.evolveFactorOutput}/sec )
          </p>
        </div>
      </div>
      <div style={cssStyle.healthBarContainer}>
        <div style={{ ...cssStyle.healthSection, right: `${100 - resource.health}%` }} />
        <div style={cssStyle.healthState}>{resource.health}</div>
      </div>
    </div>
  );
};

export default GameScreenTopBar;
