import * as React from 'react';
import { Tool, tools } from '@/models/tool';
import { useDispatch, useSelector } from 'react-redux';
import { getTool, setTool } from '@/store/editor/tool';
import { getDrawing, getParams, setParams } from '@/store/editor/params';
import '@/styles/toolbar.scss';
import { getClassName } from '@/utils/getClassName';
import IconCursor from '@/assets/svg/tools/cursor.svg';
import IconLine from '@/assets/svg/tools/line.svg';
import IconRect from '@/assets/svg/tools/rect.svg';
import IconEllipse from '@/assets/svg/tools/ellipse.svg';
import IconSpline from '@/assets/svg/tools/spline.svg';
import IconHuman from '@/assets/svg/tools/human.svg';
import IconGrid from '@/assets/svg/params/grid.svg';
import IconNodes from '@/assets/svg/params/nodes.svg';
import { EditorParams } from '@/models/editor';

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
  if (tool === 'human') return <IconHuman className={className} />;
  return null;
};

export const Toolbar: React.FC = () => {
  const tool = useSelector(getTool);
  const drawing = useSelector(getDrawing);
  const params = useSelector(getParams);
  const dispatch = useDispatch();

  const handleToolClick = (tool: Tool): void => {
    if (drawing) dispatch(setParams({ drawing: false }));
    dispatch(setTool(tool));
  };

  const handleParamClick = (param: keyof Pick<EditorParams, 'snapToGrid' | 'snapToNodes'>): void => {
    dispatch(setParams({ [param]: !params[param] }));
  };

  return <div className="toolbar">
    <div className="flx-col flx-aic">
      {
        tools.map((item, index) =>
          <button
            key={`tool-${index}`}
            className={getClassName('toolbar__item', item === tool ? 'toolbar__item_active' : '')}
            onClick={(): void => handleToolClick(item)}
          >
            <div className="icon-wrapper-m">
              <ToolIcon tool={item} className="icon-black" />
            </div>
          </button>
        )
      }
    </div>
    <div className="flx-col flx-aic">
      <button
        className={getClassName('toolbar__item', params.snapToGrid ? 'toolbar__item_active' : '')}
        onClick={(): void => handleParamClick('snapToGrid')}
      >
        <div className="icon-wrapper-m">
          <IconGrid className="icon-black" />
        </div>
      </button>
      <button
        className={getClassName('toolbar__item', params.snapToNodes ? 'toolbar__item_active' : '')}
        onClick={(): void => handleParamClick('snapToNodes')}
      >
        <div className="icon-wrapper-m">
          <IconNodes className="icon-black" />
        </div>
      </button>
    </div>
  </div>;
};
