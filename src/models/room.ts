import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';

export interface Room {
  exits: DrawingObjectID[];
  id: string;
  points: DrawingObjectPoint[];
}
