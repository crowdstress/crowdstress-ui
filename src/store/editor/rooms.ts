import { Action, ActionCreator, RootSelector } from '@/models/store';
import { Room } from '@/models/room';
import { Reducer } from 'redux';

export const SET_ROOMS = 'editor/SET_ROOMS' as const;

type SetRoomsAction = Action<typeof SET_ROOMS, readonly Room[]>;
type SetRoomsActionCreator = ActionCreator<typeof SET_ROOMS, readonly Room[]>;

export const setRooms: SetRoomsActionCreator = payload => ({
  type: SET_ROOMS,
  payload,
});

export const defaultRooms: Room[] = [];

export const rooms: Reducer<readonly Room[], SetRoomsAction> =
    (state = defaultRooms, action) => {
      if (action.type === SET_ROOMS) {
        return action.payload;
      }

      return state;
    };

export const getRooms: RootSelector<readonly Room[]> = state => state.editor.rooms;
