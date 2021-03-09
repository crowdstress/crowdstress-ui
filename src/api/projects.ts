import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';

export interface NewProjectArgs {
  name: string;
}
export interface NewProjectReply {
  id: number;
  name: string;
  updatedAt: string;
}

export interface SaveProjectArgs {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  id: number;
  name: string;
}
export interface SaveProjectReply {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  name: string;
  updatedAt: string;
}
