import { DrawingObject } from '@/models/drawingObject';
import { ADD_OBJECT, AddObjectAction } from '@/store/project/objects/types';

export const addObject = (payload: DrawingObject): AddObjectAction => ({
  type: ADD_OBJECT,
  payload,
});
