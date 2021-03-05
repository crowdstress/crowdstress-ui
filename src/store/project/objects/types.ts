import { DrawingObject } from '@/models/drawingObject';
import { Action } from '@/models/store';

export const ADD_OBJECT = 'project/ADD_OBJECT' as const;
export type AddObjectPayload = DrawingObject;
export type AddObjectAction = Action<typeof ADD_OBJECT, AddObjectPayload>;
export type ObjectsAction = AddObjectAction;
export const defaultObjects: DrawingObject[] = [];
