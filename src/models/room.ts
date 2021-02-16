import { DrawingObjectPoint } from '@/models/drawingObject';

export interface Room {
  readonly id: string;
  readonly points: readonly DrawingObjectPoint[]
}
