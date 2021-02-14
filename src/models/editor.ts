import { Tool } from '@/models/tool';
import { Undoable } from '@/models/undoable';
import { DrawingObject } from '@/models/drawingObject';
import { LayerSize } from '@/models/layer';

export interface EditorParams {
  readonly snapToNodes: boolean;
  readonly snapToGrid: boolean;
  readonly isLocked: boolean;
  readonly drawing: boolean;
  readonly gridSize: number;
  readonly layerSize: LayerSize;
}

export interface Editor {
  readonly params: EditorParams;
  readonly tool: Tool;
  readonly objects: Undoable<DrawingObject[]>;
}
