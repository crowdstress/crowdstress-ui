import { DrawingObject } from '@/models/drawingObject';

export interface SVGObjectComponentProps {
  selected: boolean;
  onClick: () => void;
  object: DrawingObject;
}
