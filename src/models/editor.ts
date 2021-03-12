import { LayerSize } from '@/models/layer';
import { Room } from '@/models/room';
import { Tool } from '@/models/tool';

export interface EditorParams {
  drawing: boolean;
  gridSize: number;
  isLocked: boolean;
  layerSize: LayerSize;
  snapToGrid: boolean;
  snapToNodes: boolean;
}

export interface Editor {
  params: EditorParams;
  rooms: Room[];
  tool: Tool;
}

export interface EditorLocationState {
  id: number;
}
