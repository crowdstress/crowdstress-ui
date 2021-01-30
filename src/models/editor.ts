import { Tool } from '@/models/tool';
import { Undoable } from '@/models/undoable';
import { DrawingObject } from '@/models/drawingObject';

export interface EditorParams {
  readonly snapToNodes: boolean;
  readonly snapToGrid: boolean;
  readonly isLocked: boolean;
  readonly drawing: boolean;
  readonly gridSize: number;
}

export interface Editor {
  readonly params: EditorParams;
  readonly tool: Tool;
  readonly objects: DrawingObject[];
}
