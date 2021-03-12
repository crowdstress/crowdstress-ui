import { createSelector } from 'reselect';

import { ProjectMetadata, ProjectState } from '@/models/project';
import { RootSelector } from '@/models/store';
import { createEqualSelector } from '@/store/createEqualSelector';

// Common
export const getProject: RootSelector<ProjectState> = state => state.project;

// Project
export const getProjectMetadata = createSelector(
  getProject,
  (result): ProjectMetadata | null => result
    ? ({
      id: result.id,
      name: result.name,
    })
    : null);
export const getProjectData = createEqualSelector(getProject, result => result?.data ?? null);

// Humans
export const getHumans = createEqualSelector(getProject, result => result?.data.humans ?? null);

// Objects
export const getObjects = createEqualSelector(getProject, result => result?.data.objects ?? null);
export const getPresentObjects = createEqualSelector(getObjects, result => result?.present ?? null);
export const getPastObjects = createEqualSelector(getObjects, result => result?.past ?? null);
export const getFutureObjects = createEqualSelector(getObjects, result => result?.future ?? null);
export const getResetAbility = createSelector(getPresentObjects, result => result !== null && result.length > 0);
export const getUndoAbility = createSelector(getPastObjects, result => result !== null && result.length > 0);
export const getRedoAbility = createSelector(getFutureObjects, result => result !== null && result.length > 0);
export const getRunAbility = createSelector(getPresentObjects, result => result !== null && result.length > 0);
