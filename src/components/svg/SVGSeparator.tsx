import React from 'react';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { getClassName } from '@/utils/getClassName';
import { IS_DEV } from '@/config';

export const SVGSeparator: React.FC<SVGObjectComponentProps> = ({ object }) => {
  const { points, state, id } = object;
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
  const devProps = IS_DEV ? { id } : {};

  return <line
    className={getClassName(
      'svg-helper',
      state === 'in-progress' ? 'svg-helper_drawing' : ''
    )}
    {...props}
    {...devProps}
  />;
};
