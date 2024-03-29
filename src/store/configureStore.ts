import { combineReducers, createStore, Reducer, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { State } from '@/models/store';
import { app } from '@/store/app/reducer';
import { defaultApp } from '@/store/app/types';
import { editor } from '@/store/editor/reducer';
import { defaultEditor } from '@/store/editor/types';
import { project, projectData } from '@/store/project/reducer';
import { defaultProject } from '@/store/project/types';

const defaultState: State = {
  app: defaultApp,
  editor: defaultEditor,
  project: defaultProject,
};

const rootReducer: Reducer<State> = combineReducers({
  app,
  editor,
  project: project(projectData),
});

export const configureStore = (): Store<State> =>
  createStore<State, any, null, null>(rootReducer, defaultState, devToolsEnhancer({ name: 'CrowdStress' }));
