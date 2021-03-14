import * as React from 'react';

import { DrawingObjectPoint } from '@/models/drawingObject';

interface SVGCrossProps {
  position: DrawingObjectPoint;
  size: number;
}

export const SVGCross: React.FC<SVGCrossProps> = ({ position, size }) => {
  const { x, y } = position;
  const halfSize = size / 2;

  return <g className="svg-cross">
    <line x1={x - halfSize} y1={y - halfSize} x2={x + halfSize} y2={y + halfSize} />
    <line x1={x - halfSize} y1={y + halfSize} x2={x + halfSize} y2={y - halfSize} />
  </g>;
};

