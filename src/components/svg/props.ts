import { DrawingObject } from '@/models/drawingObject';

export interface SVGObjectComponentProps {
  object: DrawingObject;
  onClick: () => void;
  selected: boolean;
}
