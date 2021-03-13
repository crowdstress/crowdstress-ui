import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';
import { LayerSize } from '@/models/layer';

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

export type GetProjectArgs = {
  id: number;
}
export type GetProjectReply = {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  id: number;
  name: string;
  updatedAt: string;
}

export type SaveProjectArgs = {
  data: {
    humans: Human[];
    objects: DrawingObject[];
  };
  id: number;
  layerSize: LayerSize;
  name: string;
}
export type SaveProjectReply = {
  updatedAt: string;
}
