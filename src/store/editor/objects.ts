import { Action, ActionCreator, RootSelector } from '@/models/store';
import { DrawingObject } from '@/models/drawingObject';
import { Reducer } from 'redux';

export const ADD_OBJECT = 'editor/ADD_OBJECT' as const;

type AddObjectAction = Action<typeof ADD_OBJECT, DrawingObject>;
type AddObjectActionCreator = ActionCreator<typeof ADD_OBJECT, DrawingObject>;

export const addObject: AddObjectActionCreator = payload =>
  ({
    type: ADD_OBJECT,
    payload,
  });

export const defaultObjectsState: DrawingObject[] = [];

export const objects: Reducer<DrawingObject[], AddObjectAction> =
  (state = defaultObjectsState, action) => {
    const { type, payload } = action;

    if (type === ADD_OBJECT) {
      return [
        ...state,
        payload,
      ];
    }

    return state;
  };

export const getObjects: RootSelector<DrawingObject[]> = state => state.editor.objects;
