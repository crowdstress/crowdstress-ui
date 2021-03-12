import {
  SET_PROJECT,
  SetProjectAction,
  SetProjectPayload,
  RESET_PROJECT,
  ResetProjectAction,
  UPDATE_PROJECT,
  UpdateProjectAction,
  UpdateProjectPayload
} from '@/store/project/types';

export const setProject = (payload: SetProjectPayload): SetProjectAction => ({
  payload,
  type: SET_PROJECT,
});

export const resetProject = (): ResetProjectAction => ({ type: RESET_PROJECT });

export const updateProject = (payload: UpdateProjectPayload): UpdateProjectAction => ({
  payload,
  type: UPDATE_PROJECT,
});
