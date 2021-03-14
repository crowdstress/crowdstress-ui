import { DEFAULT_GRID_SIZE, DEFAULT_LAYER_SIZE } from '@/config';
import { EditorParams } from '@/models/editor';
import { Action } from '@/models/store';

export const SET_PARAMS = 'editor/SET_PARAMS' as const;
export type SetParamsPayload = Partial<EditorParams>;
export type SetParamsAction = Action<typeof SET_PARAMS, SetParamsPayload>;
export const defaultParams: EditorParams = {
  drawing: false,
  gridSize: DEFAULT_GRID_SIZE,
  isLocked: false,
  layerSize: DEFAULT_LAYER_SIZE,
  snapToGrid: true,
  snapToNodes: false,
};
