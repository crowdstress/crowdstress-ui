import { Reducer } from 'redux';

import { User } from '@/models/user';
import { defaultUser, SET_USER, UserAction } from '@/store/app/user/types';

export const user: Reducer<User | null, UserAction> = (state = defaultUser, action) => {
  if (action.type === SET_USER) {
    return action.payload;
  }

  return state;
};
