import * as React from 'react';
import { Tool, tools } from '@/models/tool';
import { useDispatch, useSelector } from 'react-redux';
import { getTool, setTool } from '@/store/editor/tool';
import { getDrawing, getParams, setParams } from '@/store/editor/params';
import '@/styles/toolbar.scss';
import IconCursor from '@/assets/svg/tools/cursor.svg';
import IconLine from '@/assets/svg/tools/line.svg';
import IconRect from '@/assets/svg/tools/rect.svg';
import IconEllipse from '@/assets/svg/tools/ellipse.svg';
import IconSpline from '@/assets/svg/tools/spline.svg';
import IconHuman from '@/assets/svg/tools/human.svg';
import IconGrid from '@/assets/svg/params/grid.svg';
import IconNodes from '@/assets/svg/params/nodes.svg';
import { EditorParams } from '@/models/editor';
import { Bar, BarItem } from '@/components/ui/Bar';
import styled from 'styled-components';
import { BORDER_COLOR } from '@/components/ui/colors';

interface ToolIconProps {
  tool: Tool;
  className?: string;
}

const ToolbarBlock = styled(Bar)`
  grid-area: toolbar;
  border-right: 1px solid ${BORDER_COLOR};
`;

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
  const { snapToGrid, snapToNodes } = params;
  const dispatch = useDispatch();

  const handleToolClick = (tool: Tool): void => {
    if (drawing) dispatch(setParams({ drawing: false }));
    dispatch(setTool(tool));
  };

  const handleParamClick = (param: keyof Pick<EditorParams, 'snapToGrid' | 'snapToNodes'>): void => {
    dispatch(setParams({ [param]: !params[param] }));
  };

  return <ToolbarBlock direction="column">
    <div className="flx-col flx-aic">
      {
        tools.map((item, index) =>
          <BarItem
            key={`tool-${index}`}
            onClick={(): void => handleToolClick(item)}
            active={item === tool}
            margin="bottom"
          >
            <ToolIcon tool={item} className="icon-black" />
          </BarItem>
        )
      }
    </div>
    <div className="flx-col flx-aic">
      <BarItem
        onClick={(): void => handleParamClick('snapToGrid')}
        active={snapToGrid}
        margin="bottom"
      >
        <IconGrid className="icon-black" />
      </BarItem>
      <BarItem
        onClick={(): void => handleParamClick('snapToNodes')}
        active={snapToNodes}
        margin="bottom"
      >
        <IconNodes className="icon-black" />
      </BarItem>
    </div>
  </ToolbarBlock>;
};
