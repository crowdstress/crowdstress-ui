import { Reducer } from 'redux';

import { Room } from '@/models/room';
import { defaultRooms, SET_ROOMS, SetRoomsAction } from '@/store/editor/rooms/types';

export const rooms: Reducer<Room[], SetRoomsAction> =
  (state = defaultRooms, action) => {
    if (action.type === SET_ROOMS) {
      return action.payload;
    }

    return state;
  };
