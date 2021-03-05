import { Room } from '@/models/room';
import { Action } from '@/models/store';

export const SET_ROOMS = 'editor/SET_ROOMS' as const;
export type SetRoomsPayload = Room[];
export type SetRoomsAction = Action<typeof SET_ROOMS, SetRoomsPayload>;
export const defaultRooms: Room[] = [];
