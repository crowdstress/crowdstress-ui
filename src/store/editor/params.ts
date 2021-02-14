import { Action, ActionCreator, RootSelector } from '@/models/store';
import { EditorParams } from '@/models/editor';
import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import { DEFAULT_GRID_SIZE, DEFAULT_LAYER_SIZE } from '@/config';

const SET_PARAMS = 'editor/SET_PARAMS' as const;

type SetParamsAction = Action<typeof SET_PARAMS, Partial<EditorParams>>;
type SetParamsActionCreator = ActionCreator<typeof SET_PARAMS, Partial<EditorParams>>;

export const setParams: SetParamsActionCreator = payload =>
  ({
    type: SET_PARAMS,
    payload,
  });

export const defaultEditorParams: EditorParams = {
  snapToNodes: false,
  snapToGrid: true,
  isLocked: false,
  drawing: false,
  gridSize: DEFAULT_GRID_SIZE,
  layerSize: DEFAULT_LAYER_SIZE,
};

export const params: Reducer<EditorParams, SetParamsAction> =
  (state = defaultEditorParams, action) => {
    const { type, payload } = action;

    if (type === SET_PARAMS) {
      return {
        ...state,
        ...payload,
      };
    }

    return state;
  };

export const getParams: RootSelector<EditorParams> = state => state.editor.params;
export const getSnapToGrid = createSelector(getParams, params => params.snapToGrid);
export const getSnapToNodes = createSelector(getParams, params => params.snapToNodes);
export const getIsLocked = createSelector(getParams, params => params.isLocked);
export const getDrawing = createSelector(getParams, params => params.drawing);
export const getGridSize = createSelector(getParams, params => params.gridSize);
export const getLayerSize = createSelector(getParams, params => params.layerSize);
