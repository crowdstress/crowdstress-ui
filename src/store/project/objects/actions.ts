import { ADD_OBJECT, AddObjectAction, AddObjectPayload } from '@/store/project/objects/types';

export const addObject = (payload: AddObjectPayload): AddObjectAction => ({
  payload,
  type: ADD_OBJECT,
});
