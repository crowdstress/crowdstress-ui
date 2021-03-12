import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';
import { Project, ProjectState } from '@/models/project';
import { Action } from '@/models/store';

export const SET_PROJECT = 'project/SET_PROJECT' as const;
export const RESET_PROJECT = 'project/RESET_PROJECT' as const;
export const UPDATE_PROJECT = 'project/UPDATE_PROJECT' as const;
export interface SetProjectPayload {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  id: number;
  name: string;
  updatedAt: string;
}
export type SetProjectAction = Action<typeof SET_PROJECT, SetProjectPayload>;
export type ResetProjectAction = Action<typeof RESET_PROJECT>;
export type UpdateProjectPayload = Partial<Pick<Project, 'name' | 'updatedAt'>>;
export type UpdateProjectAction = Action<typeof UPDATE_PROJECT, UpdateProjectPayload>
export type ProjectAction = SetProjectAction | ResetProjectAction | UpdateProjectAction;
export const defaultProject: ProjectState = null;
