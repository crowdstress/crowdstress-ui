import { ActionCreator } from '@/models/store';
import { Undoable } from '@/models/undoable';
import { AnyAction, Reducer } from 'redux';

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
    past: [],
    present: state,
    future: [],
  });

export const undoable =
  <S, A extends AnyAction> (reducer: Reducer<S, A>, bypass?: A['type'][]): Reducer<Undoable<S>, A> => {
    const initialState: Undoable<S> = {
      past: [],
      present: reducer(undefined, { type: 'UNKNOWN' } as A),
      future: [],
    };

    return (state = initialState, action): Undoable<S> => {
      const { past, present, future } = state;

      if (action.type === UNDO) {
        return {
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future],
        };
      }

      if (action.type === REDO) {
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
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
        past: bypass?.includes(action.type) ? past : [...past, present],
        present: newPresent,
        future: [],
      };
    };
  };
