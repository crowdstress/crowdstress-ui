import * as React from 'react';

import { SVGObjectComponentProps } from '@/components/svg/props';
import { SVGGroup } from '@/components/svg/SVGGroup';
import { getClassName } from '@/utils/getClassName';

export const SVGRect: React.FC<SVGObjectComponentProps> = ({ selected, onClick, object }) => {
  const { points, state } = object;
  if (points.length < 2) return null;
  const [point1, point2] = points;
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const x = dx > 0 ? x1 : x2;
  const y = dy > 0 ? y1 : y2;
  const width = Math.abs(dx);
  const height = Math.abs(dy);
  const props: React.SVGProps<SVGRectElement> = {
    height,
    width,
    x,
    y,
  };
  return <SVGGroup onClick={onClick}>
    <rect
      className={getClassName(
        'svg-object',
        state === 'in-progress' ? 'svg-object_drawing' : '',
        selected ? 'svg-object_selected' : ''
      )}
      {...props}
    />
    { state === 'done' && <rect className="svg-hover-area" {...props} /> }
  </SVGGroup>;
};
