import { combineReducers, Reducer } from 'redux';

import { ProjectData, ProjectState } from '@/models/project';
import { humans } from '@/store/project/humans/reducer';
import { objects } from '@/store/project/objects/reducer';
import {
  SET_PROJECT,
  defaultProject,
  ProjectAction,
  RESET_PROJECT,
  UPDATE_PROJECT
} from '@/store/project/types';
import { createUndoableState, undoable } from '@/store/undoable';

export const projectData: Reducer<ProjectData> = combineReducers({
  humans,
  objects: undoable(objects),
});

export const project = (reducer: typeof projectData): Reducer<ProjectState> => {
  return (state = defaultProject, action: ProjectAction): ProjectState => {
    if (action.type === SET_PROJECT) {
      const { data } = action.payload;
      const { humans, objects } = data;
      return {
        ...action.payload,
        data: {
          humans,
          objects: createUndoableState(objects),
        },
      };
    }

    if (!state) return state;

    if (action.type === RESET_PROJECT) {
      return defaultProject;
    }

    if (action.type === UPDATE_PROJECT) {
      return {
        ...state,
        ...action.payload,
      };
    }

    return {
      ...state,
      data: reducer(state.data, action),
    };
  };
};
