export interface LayerEvent {
  x: number;
  y: number;
}

export interface LayerSize {
  width: number;
  height: number;
}

export interface LayerProps {
  top?: boolean;
  onMount?: (e: LayerSize) => void;
  onMouseMove?: (e: LayerEvent) => void;
  onMouseDown?: (e: LayerEvent) => void;
  onMouseUp?: (e: LayerEvent) => void;
  onRightClick?: (e: LayerEvent) => void;
}
