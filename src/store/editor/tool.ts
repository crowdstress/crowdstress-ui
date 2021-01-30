import { Action, RootSelector } from '@/models/store';
import { Tool } from '@/models/tool';
import { Reducer } from 'redux';

const SET_TOOL = 'editor/SET_TOOL' as const;

type SetToolAction = Action<typeof SET_TOOL, Tool>;

export const setTool = (payload: Tool): SetToolAction =>
  ({
    type: SET_TOOL,
    payload,
  });

export const defaultTool: Tool = 'line';

export const tool: Reducer<Tool, SetToolAction> =
  (state = defaultTool, action) => {
    const { type, payload } = action;

    if (type === SET_TOOL) {
      return payload;
    }

    return state;
  };

export const getTool: RootSelector<Tool> = state => state.editor.tool;
