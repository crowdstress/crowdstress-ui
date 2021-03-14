import { SET_PARAMS, SetParamsAction, SetParamsPayload } from '@/store/editor/params/types';

export const setParams = (payload: SetParamsPayload): SetParamsAction => ({
  payload,
  type: SET_PARAMS,
});
