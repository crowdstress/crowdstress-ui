import {
  CREATE_PROJECT,
  CreateProjectAction,
  CreateProjectPayload,
  RESET_PROJECT,
  ResetProjectAction
} from '@/store/project/types';

export const createProject = (payload: CreateProjectPayload): CreateProjectAction => ({
  payload,
  type: CREATE_PROJECT,
});

export const resetProject = (): ResetProjectAction => ({ type: RESET_PROJECT });
