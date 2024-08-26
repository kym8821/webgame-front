import { useEffect, useRef } from 'react';
import { TotalElementHandler } from '../../util/totalElementHandler';
import { Resource } from '../../util/resource';
import { AnimationFrameInfo } from '../../util/animationFrameInfo';

interface ResourceScreenProps {
  totalElementHandler: TotalElementHandler | undefined;
  resource: Resource;
  setResource: React.Dispatch<Resource>;
}

const ResourceScreen = ({ totalElementHandler, resource, setResource }: ResourceScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  function animate(animation: AnimationFrameInfo, callback: Function) {
    const step = (timeStamp: number) => {
      const { interval, lastFrameTime } = animation;
      if (timeStamp - lastFrameTime > interval) {
        animation.lastFrameTime = timeStamp;
        callback();
      }
      if (animation) animation.animationFrame = requestAnimationFrame(step);
    };
    animation.animationFrame = requestAnimationFrame(step);
  }

  useEffect(() => {
    if (!totalElementHandler || !canvasRef.current) return;
    canvasRef.current.width = canvasRef.current.scrollWidth;
    canvasRef.current.height = canvasRef.current.width / 2;
    const context = canvasRef.current.getContext('2d');
    if (context) contextRef.current = context;
  }, [totalElementHandler, canvasRef, contextRef, resource]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ResourceScreen;
