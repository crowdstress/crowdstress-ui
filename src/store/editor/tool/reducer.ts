import { Reducer } from 'redux';

import { Tool } from '@/models/tool';
import { defaultTool, SET_TOOL, SetToolAction } from '@/store/editor/tool/types';

export const tool: Reducer<Tool, SetToolAction> =
  (state = defaultTool, action) => {
    const { type, payload } = action;

    if (type === SET_TOOL) {
      return payload;
    }

    return state;
  };
