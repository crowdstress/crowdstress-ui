import React from 'react';
import { getToolbarButtonMargin, Toolbar, ToolbarButtonWithTooltip, ToolbarDirection } from '@/components/ui/Toolbar';
import { Tool, tools } from '@/models/tool';
import { useDispatch, useSelector } from 'react-redux';
import { getTool, setTool } from '@/store/editor/tool';
import IconCursor from '@/assets/svg/tools/cursor.svg';
import IconLine from '@/assets/svg/tools/line.svg';
import IconRect from '@/assets/svg/tools/rect.svg';
import IconEllipse from '@/assets/svg/tools/ellipse.svg';
import IconSpline from '@/assets/svg/tools/spline.svg';
import IconHuman from '@/assets/svg/tools/human.svg';
import IconExit from '@/assets/svg/tools/exit.svg';
import { getDrawing, setParams } from '@/store/editor/params';
import { capitalize } from 'lodash';

const TOOLBAR_DIRECTION: ToolbarDirection = 'column';
const TOOLBAR_BUTTON_MARGIN = getToolbarButtonMargin(TOOLBAR_DIRECTION);

interface ToolIconProps {
  tool: Tool;
  className?: string;
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
      vertical: 'top',
      horizontal: 'left',
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
