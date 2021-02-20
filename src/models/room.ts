import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';

export interface Room {
  id: string;
  points: DrawingObjectPoint[];
  exits: DrawingObjectID[];
}
