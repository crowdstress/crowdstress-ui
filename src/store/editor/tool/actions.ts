import { SET_TOOL, SetToolAction, SetToolPayload } from '@/store/editor/tool/types';

export const setTool = (payload: SetToolPayload): SetToolAction => ({
  payload,
  type: SET_TOOL,
});
