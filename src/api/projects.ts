import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';

export type NewProjectArgs = {
  name: string;
}
export type NewProjectReply = {
  id: number;
  name: string;
  updatedAt: string;
}

export type GetProjectsArgs = {
  name?: string;
}
export type GetProjectsReply = {
  id: string;
  name: string;
  updatedAt: string;
}

export type SaveProjectArgs = {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  id: number;
  name: string;
}
export type SaveProjectReply = {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  name: string;
  updatedAt: string;
}
