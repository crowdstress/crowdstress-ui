import { Tool } from '@/models/tool';
import { Undoable } from '@/models/undoable';
import { DrawingObject } from '@/models/drawingObject';
import { LayerSize } from '@/models/layer';
import { Room } from '@/models/room';
import { Human } from '@/models/human';

export interface EditorParams {
  snapToNodes: boolean;
  snapToGrid: boolean;
  isLocked: boolean;
  drawing: boolean;
  gridSize: number;
  layerSize: LayerSize;
}

export interface Editor {
  params: EditorParams;
  tool: Tool;
  objects: Undoable<DrawingObject[]>;
  rooms: Room[];
  humans: Human[];
}
