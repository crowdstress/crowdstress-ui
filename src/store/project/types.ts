import { Action } from '@/models/store';
import { Project, ProjectData } from '@/models/project';
import { defaultHumans } from '@/store/project/humans/types';
import { createUndoableState } from '@/store/undoable';
import { defaultObjects } from '@/store/project/objects/types';

export const CREATE_PROJECT = 'project/CREATE_PROJECT' as const;
export const RESET_PROJECT = 'project/RESET_PROJECT' as const;
export type CreateProjectPayload = Omit<Project, 'data'>;
export type CreateProjectAction = Action<typeof CREATE_PROJECT, CreateProjectPayload>;
export type ResetProjectAction = Action<typeof RESET_PROJECT>;
export type ProjectAction = CreateProjectAction | ResetProjectAction;
export const defaultProjectName = null;
export const defaultProjectOwner = null;
export const defaultProjectData: ProjectData = {
  humans: defaultHumans,
  objects: createUndoableState(defaultObjects),
};
export const defaultProject: Project = {
  name: defaultProjectName,
  owner: defaultProjectOwner,
  data: defaultProjectData,
};
