import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconGrid from '@/assets/svg/params/grid.svg';
import IconNodes from '@/assets/svg/params/nodes.svg';
import {
  Toolbar,
  ToolbarButtonWithTooltip,
  ToolbarDirection,
  getToolbarButtonMargin
} from '@/components/ui/Toolbar';
import { tooltipTextWithShortcut } from '@/components/ui/Tooltip';
import { SHORTCUT_TOGGLE_GRID, SHORTCUT_TOGGLE_SNAP } from '@/config';
import { EditorParams } from '@/models/editor';
import { setParams } from '@/store/editor/params/actions';
import { getParams } from '@/store/editor/selectors';

const TOOLBAR_DIRECTION: ToolbarDirection = 'column';
const TOOLBAR_BUTTON_MARGIN = getToolbarButtonMargin(TOOLBAR_DIRECTION);

export const Params: React.FC = () => {
  const params = useSelector(getParams);
  const { snapToGrid, snapToNodes } = params;
  const dispatch = useDispatch();

  console.log('render');

  const handleParamClick = (param: keyof Pick<EditorParams, 'snapToGrid' | 'snapToNodes'>): void => {
    dispatch(setParams({ [param]: !params[param] }));
  };

  return <Toolbar
    position={{
      horizontal: 'left',
      vertical: 'bottom',
    }}
    direction={TOOLBAR_DIRECTION}
  >
    <ToolbarButtonWithTooltip
      active={snapToGrid}
      tooltipPosition="right"
      margin={TOOLBAR_BUTTON_MARGIN}
      text={tooltipTextWithShortcut('Toggle grid', SHORTCUT_TOGGLE_GRID)}
      onClick={(): void => handleParamClick('snapToGrid')}
    >
      <IconGrid />
    </ToolbarButtonWithTooltip>
    <ToolbarButtonWithTooltip
      active={snapToNodes}
      tooltipPosition="right"
      margin={TOOLBAR_BUTTON_MARGIN}
      text={tooltipTextWithShortcut('Snap to nodes', SHORTCUT_TOGGLE_SNAP)}
      onClick={(): void => handleParamClick('snapToNodes')}
    >
      <IconNodes />
    </ToolbarButtonWithTooltip>
  </Toolbar>;
};
