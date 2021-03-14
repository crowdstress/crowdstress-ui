import { Reducer } from 'redux';

import { Human } from '@/models/human';
import { ADD_HUMAN, defaultHumans, HumansAction, SET_HUMANS } from '@/store/project/humans/types';

export const humans: Reducer<Human[], HumansAction> =
  (state = defaultHumans, action) => {
    if (action.type === ADD_HUMAN) {
      return [ ...state, action.payload ];
    }

    if (action.type === SET_HUMANS) {
      return action.payload;
    }

    return state;
  };
