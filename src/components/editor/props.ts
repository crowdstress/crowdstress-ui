export interface LayerEvent {
  x: number;
  y: number;
}

export interface LayerProps {
  onMouseMove?: (e: LayerEvent) => void;
  onMouseDown?: (e: LayerEvent) => void;
  onMouseUp?: (e: LayerEvent) => void;
  onRightClick?: (e: LayerEvent) => void;
}
