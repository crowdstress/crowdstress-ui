import React from 'react';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { getClassName } from '@/utils/getClassName';

export const SVGSeparator: React.FC<SVGObjectComponentProps> = ({ object }) => {
  const { points, state } = object;
  if (points.length < 2) return null;
  const [point1, point2] = points;
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const props: React.SVGProps<SVGLineElement> = {
    x1,
    y1,
    x2,
    y2,
  };

  return <line
    className={getClassName(
      'svg-helper',
      state === 'in-progress' ? 'svg-helper_drawing' : ''
    )}
    {...props}
  />;
};