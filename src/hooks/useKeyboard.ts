import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { KEY_REDO, KEY_UNDO } from '@/config';
import { getRedoAbility, getUndoAbility } from '@/store/project/selectors';
import { redo, undo } from '@/store/undoable';

export const useKeyboard = (): void => {
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
  };

  useEffect(() => {
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);

    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo]);
};
