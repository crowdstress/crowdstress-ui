import { Tool } from '@/models/tool';
import { LayerSize } from '@/models/layer';
import { Room } from '@/models/room';

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
  rooms: Room[];
}
