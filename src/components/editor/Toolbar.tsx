import * as React from 'react';
import { Tool, tools } from '@/models/tool';
import { useDispatch, useSelector } from 'react-redux';
import { getTool, setTool } from '@/store/editor/tool';
import { getDrawing, setParams } from '@/store/editor/params';
import '@/styles/toolbar.scss';
import { getClassName } from '@/utils/getClassName';
import IconCursor from '@/assets/svg/tools/cursor.svg';
import IconLine from '@/assets/svg/tools/line.svg';
import IconRect from '@/assets/svg/tools/rect.svg';
import IconEllipse from '@/assets/svg/tools/ellipse.svg';
import IconSpline from '@/assets/svg/tools/spline.svg';

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
  return null;
};

export const Toolbar: React.FC = () => {
  const tool = useSelector(getTool);
  const drawing = useSelector(getDrawing);
  const dispatch = useDispatch();

  const handleClick = (tool: Tool): void => {
    if (drawing) dispatch(setParams({ drawing: false }));
    dispatch(setTool(tool));
  };

  return <React.Fragment>
    {
      tools.map((item, index) =>
        <button
          key={`tool-${index}`}
          className={getClassName('square', 'toolbar__item', item === tool ? 'toolbar__item_active' : '')}
          onClick={(): void => handleClick(item)}
        >
          <div className="icon-wrapper-m">
            <ToolIcon tool={item} className="icon-black" />
          </div>
        </button>
      )
    }
  </React.Fragment>;
};
