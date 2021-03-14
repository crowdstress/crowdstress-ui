import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconClear from '@/assets/svg/menu/clear.svg';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconUndo from '@/assets/svg/menu/undo.svg';
import {
  getToolbarButtonMargin,
  Toolbar,
  ToolbarButton,
  ToolbarButtonWithTooltip,
  ToolbarContent,
  ToolbarDirection
} from '@/components/ui/Toolbar';
import { tooltipTextWithShortcut } from '@/components/ui/Tooltip';
import { SHORTCUT_REDO, SHORTCUT_UNDO } from '@/config';
import { setRooms } from '@/store/editor/rooms/actions';
import { getRedoAbility, getResetAbility, getUndoAbility } from '@/store/project/selectors';
import { redo, reset, undo } from '@/store/undoable';

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

  return <Toolbar
    position={{
      horizontal: 'right',
      vertical: 'bottom',
    }}
    direction={TOOLBAR_DIRECTION}
  >
    <ToolbarButtonWithTooltip
      tooltipPosition="top"
      text={tooltipTextWithShortcut('Undo', SHORTCUT_UNDO)}
      disabled={!canUndo}
      margin={TOOLBAR_BUTTON_MARGIN}
      onClick={doUndo}
    >
      <IconUndo />
    </ToolbarButtonWithTooltip>
    <ToolbarButtonWithTooltip
      tooltipPosition="top"
      text={tooltipTextWithShortcut('Redo', SHORTCUT_REDO)}
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
