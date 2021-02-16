import { DrawingObject } from '@/models/drawingObject';

export interface GetRoomsArgs {
  width: number,
  height: number,
  epsilon: number,
  objects: DrawingObject[]
}
