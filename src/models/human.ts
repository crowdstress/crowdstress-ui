import { DrawingObjectPoint } from '@/models/drawingObject';

export interface Human {
  readonly coords: DrawingObjectPoint;
  readonly panic: number;
}
