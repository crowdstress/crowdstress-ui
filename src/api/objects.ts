import { RustDrawingObject } from '@/models/drawingObject';
import { AxiosReply } from '@/utils/rest';
import { Room } from '@/models/room';
import { Section } from '@/models/section';

export interface GetRoomsArgs {
  width: number,
  height: number,
  epsilon: number,
  objects: RustDrawingObject[]
}

export type GetRoomsReply = AxiosReply<Room[]>;

export interface GetWallsArgs {
  objects: RustDrawingObject[];
}

export type GetWallsReply = AxiosReply<Section[]>;
