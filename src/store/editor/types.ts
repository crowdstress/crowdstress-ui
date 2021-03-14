import { Editor } from '@/models/editor';
import { defaultParams } from '@/store/editor/params/types';
import { defaultRooms } from '@/store/editor/rooms/types';
import { defaultTool } from '@/store/editor/tool/types';

export const defaultEditor: Editor = {
  params: defaultParams,
  rooms: defaultRooms,
  tool: defaultTool,
};
