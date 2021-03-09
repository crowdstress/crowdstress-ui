import { combineReducers, Reducer } from 'redux';

import { Project, ProjectData } from '@/models/project';
import { humans } from '@/store/project/humans/reducer';
import { objects } from '@/store/project/objects/reducer';
import {
  CREATE_PROJECT,
  defaultProject,
  ProjectAction,
  RESET_PROJECT, UPDATE_PROJECT
} from '@/store/project/types';
import { undoable } from '@/store/undoable';

export const projectData: Reducer<ProjectData> = combineReducers({
  humans,
  objects: undoable(objects),
});

export const project = (reducer: typeof projectData): Reducer<Project> => {
  const initialState: Project = {
    ...defaultProject,
    data: reducer(undefined, { type: 'UNKNOWN' }),
  };

  return (state = initialState, action: ProjectAction): Project => {
    const { name, id, data, updatedAt } = state;

    if (action.type === CREATE_PROJECT) {
      return {
        ...initialState,
        ...action.payload,
      };
    }

    if (action.type === RESET_PROJECT) {
      return initialState;
    }

    if (action.type === UPDATE_PROJECT) {
      return {
        ...state,
        ...action.payload,
      };
    }

    return {
      data: reducer(data, action),
      id,
      name,
      updatedAt,
    };
  };
};
