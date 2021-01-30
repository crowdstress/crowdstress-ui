import { combineReducers, createStore, Reducer, Store } from 'redux';
import { State } from '@/models/store';
import { defaultEditorParams, params } from '@/store/editor/params';
import { defaultObjectsState, objects } from '@/store/editor/objects';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { defaultTool, tool } from '@/store/editor/tool';

const defaultState: State = {
  editor: {
    params: defaultEditorParams,
    objects: defaultObjectsState,
    tool: defaultTool,
  },
};

const rootReducer: Reducer<State> = combineReducers({
  editor: combineReducers({
    objects,
    params,
    tool,
  }),
});

export const configureStore = (): Store<State> =>
  createStore<State, any, null, null>(rootReducer, defaultState, devToolsEnhancer({ name: 'CrowdStress' }));
