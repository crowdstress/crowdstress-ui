export interface LayerEvent {
  x: number;
  y: number;
}

export interface LayerSize {
  height: number;
  width: number;
}

export interface LayerProps {
  onMount?: (e: LayerSize) => void;
  onMouseDown?: (e: LayerEvent) => void;
  onMouseMove?: (e: LayerEvent) => void;
  onMouseUp?: (e: LayerEvent) => void;
  onRightClick?: (e: LayerEvent) => void;
  top?: boolean;
}
