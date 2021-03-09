import {
  CREATE_PROJECT,
  CreateProjectAction,
  CreateProjectPayload,
  RESET_PROJECT,
  ResetProjectAction,
  UPDATE_PROJECT,
  UpdateProjectAction,
  UpdateProjectPayload
} from '@/store/project/types';

export const createProject = (payload: CreateProjectPayload): CreateProjectAction => ({
  payload,
  type: CREATE_PROJECT,
});

export const resetProject = (): ResetProjectAction => ({ type: RESET_PROJECT });

export const updateProject = (payload: UpdateProjectPayload): UpdateProjectAction => ({
  payload,
  type: UPDATE_PROJECT,
});
