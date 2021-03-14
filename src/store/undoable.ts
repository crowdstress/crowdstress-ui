import { AnyAction, Reducer } from 'redux';

import { ActionCreator } from '@/models/store';
import { Undoable } from '@/models/undoable';

export const REDO = 'REDO' as const;
export const RESET = 'RESET' as const;
export const UNDO = 'UNDO' as const;

type RedoActionCreator = ActionCreator<typeof REDO>;
type ResetActionCreator = ActionCreator<typeof RESET>;
type UndoActionCreator = ActionCreator<typeof UNDO>;

export const redo: RedoActionCreator = () => ({ type: REDO });
export const reset: ResetActionCreator = () => ({ type: RESET });
export const undo: UndoActionCreator = () => ({ type: UNDO });

export const createUndoableState = <T> (state: T): Undoable<T> =>
  ({
    future: [],
    past: [],
    present: state,
  });

export const undoable =
  <S, A extends AnyAction> (reducer: Reducer<S, A>, bypass?: A['type'][]): Reducer<Undoable<S>, A> => {
    const initialState: Undoable<S> = {
      future: [],
      past: [],
      present: reducer(undefined, { type: 'UNKNOWN' } as A),
    };

    return (state = initialState, action): Undoable<S> => {
      const { past, present, future } = state;

      if (action.type === UNDO) {
        return {
          future: [present, ...future],
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
        };
      }

      if (action.type === REDO) {
        return {
          future: future.slice(1),
          past: [...past, present],
          present: future[0],
        };
      }

      if (action.type === RESET) {
        return initialState;
      }

      const newPresent = reducer(present, action as A);

      if (newPresent === present) {
        return state;
      }

      return {
        future: [],
        past: bypass?.includes(action.type) ? past : [...past, present],
        present: newPresent,
      };
    };
  };
