import * as React from 'react';
import { SVGGroup } from '@/components/svg/SVGGroup';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { getClassName } from '@/utils/getClassName';

export const SVGLine: React.FC<SVGObjectComponentProps> = ({ object, onClick, selected }) => {
  const { points, state } = object;
  if (points.length < 2) return null;
  const [point1, point2] = points;
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const props: React.SVGProps<SVGLineElement> = {
    x1,
    y1,
    x2,
    y2,
  };
  return <SVGGroup onClick={onClick}>
    <line
      className={getClassName(
        'svg-object',
        state === 'in-progress' ? 'svg-object_drawing' : '',
        selected ? 'svg-object_selected' : ''
      )}
      {...props}
    />
    { state === 'done' && <line className="svg-hover-area" {...props} /> }
  </SVGGroup>;
};
