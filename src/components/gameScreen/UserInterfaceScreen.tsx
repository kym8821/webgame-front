import { useEffect, useRef } from "react";
import { handleCanvasClickEvent } from "../../hooks/event/canvasClickEvent";
import style from "../../assets/css/gameScreen.module.css";
import { Resource } from "../../util/resource";
import { TotalScreenManager } from "../../util/totalScreenManager";
import { TotalElementHandler } from "../../util/totalElementHandler";
import { SelectedComponent } from "../../util/SelectedComponent";
import canvasMoveEvent from "../../hooks/event/canvasMoveEvent";
import canvasResizeEvent from "../../hooks/event/canvasResizeEvent";

interface UserInterfaceScreen {
  totalScreenManager: TotalScreenManager | undefined;
  totalElementHandler: TotalElementHandler | undefined;
  selectedComponent: SelectedComponent | null;
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const UserInterfaceScreen = ({
  totalScreenManager,
  totalElementHandler,
  selectedComponent,
  resource,
  setResource,
}: UserInterfaceScreen) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const draggingStateRef = useRef<Boolean>(false);

  useEffect(() => {
    if (!totalScreenManager || !totalElementHandler) return;
    function setCanvasAndContext() {
      if (!totalScreenManager) return;
      // set canvas
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.scrollWidth;
      canvasRef.current.height = canvasRef.current.width / 2;
      // set context
      const context = canvasRef.current.getContext("2d");
      if (!context) return;
      contextRef.current = context;
      totalScreenManager.userScreenManager.canvasRef = canvasRef;
      totalScreenManager.userScreenManager.contextRef = contextRef;
    }
    setCanvasAndContext();
    if (!canvasRef.current || !contextRef.current) return;
    canvasRef.current.onclick = (e: MouseEvent) => {
      if (draggingStateRef.current) return;
      handleCanvasClickEvent(e, totalScreenManager, totalElementHandler, selectedComponent, resource, setResource);
    };

    const handleResize = debounce((e: UIEvent) => {
      if (!canvasRef.current) return;
      canvasResizeEvent.handleResize(e, totalElementHandler, canvasRef.current.scrollWidth, canvasRef.current.scrollWidth / 2);
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalElementHandler, totalScreenManager, selectedComponent, resource]);

  return (
    <div className={`${style.gameScreen} ${style.clickEventScreen}`} style={{ zIndex: 10 }}>
      {totalElementHandler && (
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => canvasMoveEvent.handleMouseMove(e, totalElementHandler, draggingStateRef)}
          onMouseDown={(e) => canvasMoveEvent.handleMouseDown(e, totalElementHandler, draggingStateRef)}
          onMouseUp={() => canvasMoveEvent.handleMouseUp(totalElementHandler)}
          onMouseOut={() => canvasMoveEvent.handleMouseOut(totalElementHandler)}
          onWheel={(e) => canvasMoveEvent.handleWheelMove(e, totalElementHandler)}
        />
      )}
    </div>
  );
};

export default UserInterfaceScreen;
