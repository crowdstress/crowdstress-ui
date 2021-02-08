import { drawingObjectTypes } from '@/models/drawingObject';

export const tools = ['cursor', ...drawingObjectTypes, 'human'] as const;
export type Tool = typeof tools[number];
