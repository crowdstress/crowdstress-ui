import * as React from 'react';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { SVGGroup } from '@/components/svg/SVGGroup';
import { getClassName } from '@/utils/getClassName';

export const SVGEllipse: React.FC<SVGObjectComponentProps> = ({ object, onClick, selected }) => {
  const { points, state } = object;
  if (points.length < 2) return null;
  const [point1, point2] = points;
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const props: React.SVGProps<SVGEllipseElement> = {
    cx: (x1 + x2) / 2,
    cy: (y1 + y2) / 2,
    rx: Math.abs(dx / 2),
    ry: Math.abs(dy / 2),
  };

  return <SVGGroup onClick={onClick}>
    <ellipse
      className={getClassName(
        'svg-object',
        state === 'in-progress' ? 'svg-object_drawing' : '',
        selected ? 'svg-object_selected' : ''
      )}
      {...props}
    />
    { state === 'done' && <ellipse className="svg-hover-area" {...props} /> }
  </SVGGroup>;
};
