import React from 'react';
import {
  getToolbarButtonMargin,
  Toolbar,
  ToolbarButton,
  ToolbarButtonWithTooltip,
  ToolbarContent,
  ToolbarDirection
} from '@/components/ui/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { redo, reset, undo } from '@/store/undoable';
import IconUndo from '@/assets/svg/menu/undo.svg';
import { setRooms } from '@/store/editor/rooms';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconClear from '@/assets/svg/menu/clear.svg';
import { getRedoAbility, getResetAbility, getUndoAbility } from '@/store/project/objects/selectors';
import { SHORTCUT_REDO, SHORTCUT_UNDO } from '@/config';
import { oneLineTooltipText } from '@/components/ui/Tooltip';

const TOOLBAR_DIRECTION: ToolbarDirection = 'row';
const TOOLBAR_BUTTON_MARGIN = getToolbarButtonMargin(TOOLBAR_DIRECTION);

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
  }}
  direction={TOOLBAR_DIRECTION}
  >
    <ToolbarButtonWithTooltip
      tooltipPosition="top"
      text={oneLineTooltipText(SHORTCUT_UNDO)}
      disabled={!canUndo}
      margin={TOOLBAR_BUTTON_MARGIN}
      onClick={doUndo}
    >
      <IconUndo />
    </ToolbarButtonWithTooltip>
    <ToolbarButtonWithTooltip
      tooltipPosition="top"
      text={oneLineTooltipText(SHORTCUT_REDO)}
      disabled={!canRedo}
      margin={TOOLBAR_BUTTON_MARGIN}
      onClick={doRedo}
    >
      <IconRedo />
    </ToolbarButtonWithTooltip>
    <ToolbarButton
      margin={TOOLBAR_BUTTON_MARGIN}
      disabled={!canReset}
      onClick={doReset}>
      <ToolbarContent disabled={!canReset}>
        <IconClear />
      </ToolbarContent>
    </ToolbarButton>
  </Toolbar>;
};
