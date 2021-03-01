import { combineReducers, createStore, Reducer, Store } from 'redux';
import { State } from '@/models/store';
import { defaultEditorParams, params } from '@/store/editor/params';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { defaultTool, tool } from '@/store/editor/tool';
import { defaultRooms, rooms } from '@/store/editor/rooms';
import { project, projectData } from '@/store/project/reducer';
import { defaultProject } from '@/store/project/types';

const defaultState: State = {
  editor: {
    params: defaultEditorParams,
    rooms: defaultRooms,
    tool: defaultTool,
  },
  project: defaultProject,
};

const rootReducer: Reducer<State> = combineReducers({
  editor: combineReducers({
    rooms,
    params,
    tool,
  }),
  project: project(projectData),
});

export const configureStore = (): Store<State> =>
  createStore<State, any, null, null>(rootReducer, defaultState, devToolsEnhancer({ name: 'CrowdStress' }));
