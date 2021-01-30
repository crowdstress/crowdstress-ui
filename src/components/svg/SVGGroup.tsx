import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTool } from '@/store/editor/tool';
import { getClassName } from '@/utils/getClassName';

interface SVGGroupProps {
  onClick: (e: React.MouseEvent<SVGElement>) => void;
}

export const SVGGroup: React.FC<SVGGroupProps> =
  ({ onClick, children }) => {
    const tool = useSelector(getTool);

    const handleClick = (e: React.MouseEvent<SVGElement>): void => {
      tool === 'cursor' && e.stopPropagation();
      onClick(e);
    };

    return <g
      className={getClassName('svg-group', tool !== 'cursor' ? 'svg-group_no-hover' : '')}
      onMouseDown={handleClick}
    >
      {children}
    </g>;
  };
