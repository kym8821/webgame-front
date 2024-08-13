import monsterImages from "../../assets/images/monster/monsterImages";
import { FacilityFrame } from "../facility/facilityFrame";
import { FacilityInfo } from "../facility/facilityInfo";
import { LauncherFrame } from "../launcher/launcherFrame";
import { LauncherInfo } from "../launcher/launcherInfo";
import MonsterFrame from "../monster/monsterFrame";
import { MonsterInfo } from "../monster/monsterInfo";

function loadMonsterFrame(monsterInfo: MonsterInfo, startMapX: number, startMapY: number, id: number) {
  const monster: MonsterFrame = {
    id: id,
    info: monsterInfo,
    frameNumber: 0,
    startMapX: startMapX,
    startMapY: startMapY,
    move: 0,
    lifePoint: monsterInfo.lifePoint,
    images: [],
  };
  for (let i = 0; i < monsterInfo.frameSize; i++) {
    const frame = new Image();
    const src = `${monsterInfo.name}${i}`;
    if (src in monsterImages) {
      frame.src = monsterImages[src];
      monster.images.push(frame);
    } else {
      console.error(`Frame ${src} not found in monsterImages object.`);
    }
  }
  if (monster.images.length > 0) return monster;
  return undefined;
}

function loadLauncherFrame(launcherInfo: LauncherInfo, startMapX: number, startMapY: number) {
  const launcher: LauncherFrame = {
    info: launcherInfo,
    angle: 0,
    projectileId: 1,
    frameNumber: 0,
    mapStartX: startMapX,
    mapStartY: startMapY,
    images: [],
  };
  const frame = new Image();
  frame.src = launcherInfo.src;
  launcher.images.push(frame);
  if (launcher.images.length > 0) return launcher;
  return undefined;
}

function loadFacilityFrame(facilityInfo: FacilityInfo, startMapX: number, startMapY: number) {
  const facilityFrame: FacilityFrame = {
    info: facilityInfo,
    mapPosX: startMapX,
    mapPosY: startMapY,
    frameNumber: 0,
    images: [],
  };
  const image = new Image();
  image.src = facilityInfo.src;
  facilityInfo.frames.forEach((src) => {
    const image = new Image();
    image.src = src;
    facilityFrame.images.push(image);
  });
  return facilityFrame;
}

function loadMapFrame() {}

const objectFrameLoader = { loadMonsterFrame, loadLauncherFrame, loadFacilityFrame };

export default objectFrameLoader;
