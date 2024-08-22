import facilityInfo from "../util/facility/facilityInfo";
import mapElementInfo from "../util/map/mapElementInfo";
import monsterInfo from "../util/monster/monsterInfo";
import { ObjectInfo } from "../util/object/objectInfo";
import projectileInfo from "../util/projectile/projectileInfo";
import launcherInfo from "../util/launcher/launcherInfo";
import { TotalElementHandler } from "../util/totalElementHandler";

async function loadImages<T extends ObjectInfo>(objectInfoList: T[]) {
  const loadPromises: Promise<void>[] = [];
  for (let i = 0; i < objectInfoList.length; i++) {
    const objectInfo = objectInfoList[i];
    for (let j = 0; j < objectInfo.src.length; j++) {
      const image = new Image();
      image.src = objectInfo.src[j];
      const imageLoadPromise = new Promise<void>((resolve, reject) => {
        image.onload = () => {
          objectInfo.images.push(image);
          resolve();
        };
        image.onerror = () => {
          alert("image load fail");
          throw new Error("image load fail");
        };
      });
      loadPromises.push(imageLoadPromise);
    }
  }
  await Promise.all(loadPromises);
}

export async function loadObjectInfoImages(totalElementHandler: TotalElementHandler) {
  const objectInfoSetList = [monsterInfo, mapElementInfo, facilityInfo, projectileInfo, launcherInfo];
  for (let i = 0; i < objectInfoSetList.length; i++) {
    const objectInfoSet = objectInfoSetList[i];
    const objectInfoList = Object.values(objectInfoSet);
    await loadImages(objectInfoList);
  }
  totalElementHandler.redrawScreenLists.map((handler) => {
    handler.reDraw();
  });
}
