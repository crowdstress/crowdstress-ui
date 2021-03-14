import {
  ADD_HUMAN,
  AddHumanAction,
  AddHumanPayload,
  SET_HUMANS,
  SetHumansAction,
  SetHumansPayload
} from '@/store/project/humans/types';

export const addHuman = (payload: AddHumanPayload): AddHumanAction => ({
  payload,
  type: ADD_HUMAN,
});

export const setHumans = (payload: SetHumansPayload): SetHumansAction => ({
  payload,
  type: SET_HUMANS,
});
