import { Human } from '@/models/human';
import { Undoable } from '@/models/undoable';
import { DrawingObject } from '@/models/drawingObject';

export interface ProjectData {
  humans: Human[];
  objects: Undoable<DrawingObject[]>;
}

export interface Project {
  name: string | null;
  owner: string | null;
  protected: boolean;
  data: ProjectData;
}
