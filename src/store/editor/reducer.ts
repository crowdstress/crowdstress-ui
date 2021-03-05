import { combineReducers, Reducer } from 'redux';

import { Editor } from '@/models/editor';
import { params } from '@/store/editor/params/reducer';
import { rooms } from '@/store/editor/rooms/reducer';
import { tool } from '@/store/editor/tool/reducer';

export const editor: Reducer<Editor> = combineReducers({
  params,
  rooms,
  tool,
});
