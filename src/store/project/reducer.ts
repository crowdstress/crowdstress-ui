import { combineReducers, Reducer } from 'redux';
import {
  CREATE_PROJECT,
  defaultProjectName,
  defaultProjectOwner,
  ProjectAction, RESET_PROJECT
} from '@/store/project/types';
import { Project, ProjectData } from '@/models/project';
import { undoable } from '@/store/undoable';
import { humans } from '@/store/project/humans/reducer';
import { objects } from '@/store/project/objects/reducer';

export const projectData: Reducer<ProjectData> = combineReducers({
  humans,
  objects: undoable(objects),
});

export const project = (reducer: typeof projectData): Reducer<Project> => {
  const initialState: Project = {
    name: defaultProjectName,
    owner: defaultProjectOwner,
    data: reducer(undefined, { type: 'UNKNOWN' }),
  };

  return (state = initialState, action: ProjectAction): Project => {
    const { name, owner, data } = state;

    if (action.type === CREATE_PROJECT) {
      return {
        ...initialState,
        ...action.payload,
      };
    }

    if (action.type === RESET_PROJECT) {
      return initialState;
    }

    return {
      name,
      owner,
      data: reducer(data, action),
    };
  };
};
