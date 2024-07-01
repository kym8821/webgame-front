interface ProjectileFrame {
  info: {
    type: string;
    frameSize: number;
    frameNumber: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
    damage: number;
  };
  frame: HTMLImageElement[];
}

export default ProjectileFrame;
