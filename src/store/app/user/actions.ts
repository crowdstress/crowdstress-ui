import { SET_USER, SetUserAction, SetUserPayload } from '@/store/app/user/types';

export const setUser = (payload: SetUserPayload): SetUserAction => ({
  payload,
  type: SET_USER,
});
