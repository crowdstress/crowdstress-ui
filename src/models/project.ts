import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';
import { Undoable } from '@/models/undoable';

export interface ProjectData {
  humans: Human[];
  objects: Undoable<DrawingObject[]>;
}

export interface Project {
  data: ProjectData;
  id: number | null;
  name: string | null;
  updatedAt: string | null;
}

export type ProjectMetadata = Pick<Project, 'id' | 'name'>;
