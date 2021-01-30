import { drawingObjectTypes } from '@/models/drawingObject';

export const tools = ['cursor', ...drawingObjectTypes] as const;
export type Tool = typeof tools[number];
