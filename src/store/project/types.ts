import { Project, ProjectData } from '@/models/project';
import { Action } from '@/models/store';
import { defaultHumans } from '@/store/project/humans/types';
import { defaultObjects } from '@/store/project/objects/types';
import { createUndoableState } from '@/store/undoable';

export const CREATE_PROJECT = 'project/CREATE_PROJECT' as const;
export const RESET_PROJECT = 'project/RESET_PROJECT' as const;
export const UPDATE_PROJECT = 'project/UPDATE_PROJECT' as const;
export type CreateProjectPayload = Omit<Project, 'data'>;
export type CreateProjectAction = Action<typeof CREATE_PROJECT, CreateProjectPayload>;
export type ResetProjectAction = Action<typeof RESET_PROJECT>;
export type UpdateProjectPayload = Partial<Pick<Project, 'name' | 'updatedAt'>>;
export type UpdateProjectAction = Action<typeof UPDATE_PROJECT, UpdateProjectPayload>
export type ProjectAction = CreateProjectAction | ResetProjectAction | UpdateProjectAction;
export const defaultProjectName = null;
export const defaultProjectOwner = null;
export const defaultProjectData: ProjectData = {
  humans: defaultHumans,
  objects: createUndoableState(defaultObjects),
};
export const defaultProject: Project = {
  data: defaultProjectData,
  id: null,
  name: defaultProjectName,
  updatedAt: null,
};
