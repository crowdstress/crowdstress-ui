import { createSelector } from 'reselect';

import { Project, ProjectMetadata } from '@/models/project';
import { RootSelector } from '@/models/store';
import { createEqualSelector } from '@/store/createEqualSelector';

// Common
export const getProject: RootSelector<Project> = state => state.project;

// Project
export const getProjectMetadata = createSelector(getProject, ({ id, name }): ProjectMetadata => ({
  id,
  name,
}));
export const getProjectData = createEqualSelector(getProject, result => result.data);
export const getIsInitialized = createSelector(getProject, result => result.name !== null);

// Humans
export const getHumans = createEqualSelector(getProject, result => result.data.humans);

// Objects
export const getObjects = createEqualSelector(getProject, result => result.data.objects);
export const getPresentObjects = createEqualSelector(getObjects, result => result.present);
export const getPastObjects = createEqualSelector(getObjects, result => result.past);
export const getFutureObjects = createEqualSelector(getObjects, result => result.future);
export const getResetAbility = createSelector(getPresentObjects, result => result.length > 0);
export const getUndoAbility = createSelector(getPastObjects, result => result.length > 0);
export const getRedoAbility = createSelector(getFutureObjects, result => result.length > 0);
export const getRunAbility = createSelector(getPresentObjects, result => result.length > 0);
