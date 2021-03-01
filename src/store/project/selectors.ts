import { RootSelector } from '@/models/store';
import { Project } from '@/models/project';
import { createEqualSelector } from '@/store/createEqualSelector';
import { createSelector } from 'reselect';

const project: RootSelector<Project> = state => state.project;
export const getProject = createEqualSelector(project, result => result);
export const getProjectName = createSelector(getProject, result => result.name);
export const getProjectOwner = createSelector(getProject, result => result.owner);
export const getProjectData = createEqualSelector(getProject, result => result.data);
export const getIsInitialized = createSelector(getProject, result => result.name !== null && result.owner !== null);
