import { Reducer } from 'redux';

import { DrawingObject } from '@/models/drawingObject';
import { ADD_OBJECT, defaultObjects, ObjectsAction } from '@/store/project/objects/types';

export const objects: Reducer<DrawingObject[], ObjectsAction> =
  (state = defaultObjects, action) => {
    if (action.type === ADD_OBJECT) {
      return [ ...state, action.payload ];
    }

    return state;
  };
