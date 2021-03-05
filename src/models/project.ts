import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';
import { Undoable } from '@/models/undoable';

export interface ProjectData {
  humans: Human[];
  objects: Undoable<DrawingObject[]>;
}

export interface Project {
  data: ProjectData;
  isProtected: boolean;
  name: string | null;
  owner: string | null;
}
