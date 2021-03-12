import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';
import { Undoable } from '@/models/undoable';

export interface ProjectData {
  humans: Human[];
  objects: Undoable<DrawingObject[]>;
}

export interface Project {
  data: ProjectData;
  id: number;
  name: string;
  updatedAt: string;
}

export type ProjectMetadata = Pick<Project, 'id' | 'name'>;

export type ProjectState = Project | null;
