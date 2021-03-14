import { Action } from '@/models/store';
import { Tool } from '@/models/tool';

export const SET_TOOL = 'editor/SET_TOOL' as const;
export type SetToolPayload = Tool;
export type SetToolAction = Action<typeof SET_TOOL, SetToolPayload>;
export const defaultTool: Tool = 'line';
