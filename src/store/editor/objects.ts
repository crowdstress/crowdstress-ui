import { Action, ActionCreator, RootSelector } from '@/models/store';
import { DrawingObject } from '@/models/drawingObject';
import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import { Undoable } from '@/models/undoable';
import { createEqualSelector } from '@/store/createEqualSelector';

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
    if (action.type === ADD_OBJECT) {
      return [
        ...state,
        action.payload,
      ];
    }

    return state;
  };

export const getObjects: RootSelector<Undoable<DrawingObject[]>> = state => state.editor.objects;
export const getPresentObjects = createEqualSelector(getObjects, objects => objects.present);
export const getPastObjects = createEqualSelector(getObjects, objects => objects.past);
export const getFutureObjects = createEqualSelector(getObjects, objects => objects.future);
export const getResetAbility = createSelector(getPresentObjects, objects => objects.length > 0);
export const getUndoAbility = createSelector(getPastObjects, objects => objects.length > 0);
export const getRedoAbility = createSelector(getFutureObjects, objects => objects.length > 0);
export const getRunAbility = createSelector(getPresentObjects, objects => objects.length > 0);
