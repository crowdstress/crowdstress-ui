import { combineReducers, createStore, Reducer, Store } from 'redux';
import { State } from '@/models/store';
import { defaultEditorParams, params } from '@/store/editor/params';
import { defaultObjectsState, objects } from '@/store/editor/objects';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { defaultTool, tool } from '@/store/editor/tool';
import { createUndoableState, undoable } from '@/store/undoable';
import { defaultRooms, rooms } from '@/store/editor/rooms';
import { defaultHumans, humans } from '@/store/editor/humans';

const defaultState: State = {
  editor: {
    params: defaultEditorParams,
    objects: createUndoableState(defaultObjectsState),
    rooms: defaultRooms,
    tool: defaultTool,
    humans: defaultHumans,
  },
};

const rootReducer: Reducer<State> = combineReducers({
  editor: combineReducers({
    objects: undoable(objects),
    rooms,
    params,
    tool,
    humans,
  }),
});

export const configureStore = (): Store<State> =>
  createStore<State, any, null, null>(rootReducer, defaultState, devToolsEnhancer({ name: 'CrowdStress' }));
