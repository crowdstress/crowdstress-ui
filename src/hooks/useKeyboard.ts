import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { KEY_REDO, KEY_TOGGLE_GRID, KEY_TOGGLE_SNAP, KEY_UNDO } from '@/config';
import { setParams } from '@/store/editor/params/actions';
import { getParams } from '@/store/editor/selectors';
import { getRedoAbility, getUndoAbility } from '@/store/project/selectors';
import { redo, undo } from '@/store/undoable';

export const useKeyboard = (): void => {
  const params = useSelector(getParams);
  const { snapToGrid, snapToNodes } = params;
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const dispatch = useDispatch();

  const handleKeyDown = (e: KeyboardEvent): void => {
    e.preventDefault();

    const undoKeyCombination = e.ctrlKey && !e.shiftKey && e.key.toUpperCase() === KEY_UNDO;

    if (undoKeyCombination && canUndo) {
      dispatch(undo());
      return;
    }

    const redoKeyCombination =
      e.ctrlKey && e.key.toUpperCase() === KEY_REDO ||
      e.ctrlKey && e.shiftKey && e.key.toUpperCase() === KEY_UNDO;

    if (redoKeyCombination && canRedo) {
      dispatch(redo());
      return;
    }

    if (e.key.toUpperCase() === KEY_TOGGLE_GRID) {
      dispatch(setParams({ snapToGrid: !snapToGrid }));
      return;
    }

    if (e.key.toUpperCase() === KEY_TOGGLE_SNAP) {
      dispatch(setParams({ snapToNodes: !snapToNodes }));
      return;
    }
  };

  useEffect(() => {
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);

    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [params, canUndo, canRedo]);
};
