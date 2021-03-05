import { SET_ROOMS, SetRoomsAction, SetRoomsPayload } from '@/store/editor/rooms/types';

export const setRooms = (payload: SetRoomsPayload): SetRoomsAction => ({
  payload,
  type: SET_ROOMS,
});
