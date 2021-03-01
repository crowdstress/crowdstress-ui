import { Action } from '@/models/store';
import { DrawingObject } from '@/models/drawingObject';

export const ADD_OBJECT = 'project/ADD_OBJECT' as const;
export type AddObjectAction = Action<typeof ADD_OBJECT, DrawingObject>;
export type ObjectsAction = AddObjectAction;
export const defaultObjects: DrawingObject[] = [];
