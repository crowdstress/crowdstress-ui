import React from 'react';
import { Toolbar, ToolbarButton } from '@/components/ui/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { redo, reset, undo } from '@/store/undoable';
import IconUndo from '@/assets/svg/menu/undo.svg';
import { setRooms } from '@/store/editor/rooms';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconClear from '@/assets/svg/menu/clear.svg';
import { getRedoAbility, getResetAbility, getUndoAbility } from '@/store/project/objects/selectors';

export const Actions: React.FC = () => {
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const canReset = useSelector(getResetAbility);

  const dispatch = useDispatch();

  const doUndo = (): void => {
    dispatch(undo());
  };

  const doRedo = (): void => {
    dispatch(redo());
  };

  const doReset = (): void => {
    dispatch(reset());
    dispatch(setRooms([]));
  };

  return <Toolbar position={{
    vertical: 'bottom',
    horizontal: 'right',
  }} direction="row">
    <ToolbarButton margin="right" disabled={!canUndo} onClick={doUndo}>
      <IconUndo />
    </ToolbarButton>
    <ToolbarButton margin="right" disabled={!canRedo} onClick={doRedo}>
      <IconRedo />
    </ToolbarButton>
    <ToolbarButton margin="right" disabled={!canReset} onClick={doReset}>
      <IconClear />
    </ToolbarButton>
  </Toolbar>;
};
