import { RustDrawingObject } from '@/models/drawingObject';
import { Room } from '@/models/room';
import { Section } from '@/models/section';
import { AxiosReply } from '@/utils/rest';

export type GetRoomsArgs = {
  epsilon: number,
  height: number,
  objects: RustDrawingObject[],
  width: number
}

export type GetRoomsReply = AxiosReply<Room[]>;

export type GetWallsArgs = {
  objects: RustDrawingObject[];
}

export type GetWallsReply = AxiosReply<Section[]>;
