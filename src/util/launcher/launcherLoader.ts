import launcherImages from '../../assets/images/launcher/launcherImages';
import { LauncherFrame } from './launcherFrame';
import { LauncherInfo } from './launcherInfo';

const loadFrames = (launcherInfo: LauncherInfo) => {
  const launcher: LauncherFrame = {
    info: {
      type: launcherInfo.name,
      posX: 500,
      posY: 500,
      frameSize: launcherInfo.frameSize,
      frameNumber: 0,
      width: launcherInfo.width,
      height: launcherInfo.height,
      radian: 0,
    },
    frame: [],
  };
  const frame = new Image();
  const src = `${launcherInfo.name}`;
  if (src in launcherImages) {
    frame.src = launcherImages[src];
    launcher.frame.push(frame);
  } else {
    console.error(`Frame ${src} not found in monsterImages object.`);
  }
  if (launcher.frame.length > 0) return launcher;
  return undefined;
};

const launcherLoader = { loadFrames };

export default launcherLoader;
