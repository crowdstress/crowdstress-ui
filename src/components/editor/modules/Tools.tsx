import { capitalize } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconCursor from '@/assets/svg/tools/cursor.svg';
import IconEllipse from '@/assets/svg/tools/ellipse.svg';
import IconExit from '@/assets/svg/tools/exit.svg';
import IconHuman from '@/assets/svg/tools/human.svg';
import IconLine from '@/assets/svg/tools/line.svg';
import IconRect from '@/assets/svg/tools/rect.svg';
import IconSpline from '@/assets/svg/tools/spline.svg';
import { getToolbarButtonMargin, Toolbar, ToolbarButtonWithTooltip, ToolbarDirection } from '@/components/ui/Toolbar';
import { Tool, tools } from '@/models/tool';
import { setParams } from '@/store/editor/params/actions';
import { getDrawing, getTool } from '@/store/editor/selectors';
import { setTool } from '@/store/editor/tool/actions';

const TOOLBAR_DIRECTION: ToolbarDirection = 'column';
const TOOLBAR_BUTTON_MARGIN = getToolbarButtonMargin(TOOLBAR_DIRECTION);

interface ToolIconProps {
  className?: string;
  tool: Tool;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ tool, className }) => {
  if (tool === 'cursor') return <IconCursor className={className} />;
  if (tool === 'line') return <IconLine className={className} />;
  if (tool === 'rect') return <IconRect className={className} />;
  if (tool === 'ellipse') return <IconEllipse className={className} />;
  if (tool === 'qcurve') return <IconSpline className={className} />;
  if (tool === 'separator') return <IconExit className={className} />;
  if (tool === 'human') return <IconHuman className={className} />;
  return null;
};

export const Tools: React.FC = () => {
  const tool = useSelector(getTool);
  const drawing = useSelector(getDrawing);
  const dispatch = useDispatch();

  const handleToolClick = (tool: Tool): void => {
    if (drawing) dispatch(setParams({ drawing: false }));
    dispatch(setTool(tool));
  };

  return <Toolbar
    position={{
      horizontal: 'left',
      vertical: 'top',
    }}
    direction={TOOLBAR_DIRECTION}
  >
    {
      tools.map((item, index) =>
        <ToolbarButtonWithTooltip
          key={`tool-${index}`}
          active={item === tool}
          tooltipPosition="right"
          text={capitalize(item)}
          margin={TOOLBAR_BUTTON_MARGIN}
          onClick={(): void => handleToolClick(item)}
        >
          <ToolIcon tool={item} />
        </ToolbarButtonWithTooltip>
      )
    }
  </Toolbar>;
};
