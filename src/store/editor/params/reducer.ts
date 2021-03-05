import { Reducer } from 'redux';

import { EditorParams } from '@/models/editor';
import { defaultParams, SET_PARAMS, SetParamsAction } from '@/store/editor/params/types';

export const params: Reducer<EditorParams, SetParamsAction> = (state = defaultParams, action) => {
  const { type, payload } = action;

  if (type === SET_PARAMS) {
    return {
      ...state,
      ...payload,
    };
  }

  return state;
};
