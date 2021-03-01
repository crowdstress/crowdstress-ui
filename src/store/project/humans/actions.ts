import { Human } from '@/models/human';
import { ADD_HUMAN, AddHumanAction, SET_HUMANS, SetHumansAction } from '@/store/project/humans/types';

export const addHuman = (payload: Human): AddHumanAction => ({
  type: ADD_HUMAN,
  payload,
});

export const setHumans = (payload: Human[]): SetHumansAction => ({
  type: SET_HUMANS,
  payload,
});
