import greenSlime0 from "./greenSlime0.png";
import greenSlime1 from "./greenSlime1.png";
import blueSlime0 from "./blueSlime0.png";
import blueSlime1 from "./blueSlime1.png";
import skeleton0 from "./skeleton0.png";
import skeleton1 from "./skeleton1.png";
import skeleton2 from "./skeleton2.png";
import skeleton3 from "./skeleton3.png";

interface MonsterImages {
  [key: string]: string;
}

const monsterImages: MonsterImages = {
  greenSlime0: greenSlime0,
  greenSlime1: greenSlime1,
  blueSlime0: blueSlime0,
  blueSlime1: blueSlime1,
  skeleton0: skeleton0,
  skeleton1: skeleton1,
  skeleton2: skeleton2,
  skeleton3: skeleton3,
};

export default monsterImages;
