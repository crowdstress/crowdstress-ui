import * as React from 'react';
import { DrawingObject, DrawingObjectPoint } from '@/models/drawingObject';
import { SVGLine } from '@/components/svg/SVGLine';
import '@/styles/svg.scss';
import { SVGRect } from '@/components/svg/SVGRect';
import { useEffect, useState } from 'react';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { useSelector } from 'react-redux';
import { getDrawing } from '@/store/editor/params';
import { getTool } from '@/store/editor/tool';

const getD = (points: readonly DrawingObjectPoint[]): string => {
  const [startPoint] = points;
  const [startX, startY] = startPoint;
  const result = `M${startX} ${startY} Q`;
  return points.reduce((acc, val) => {
    const [x, y] = val;
    acc = acc + `${x} ${y},`;
    return acc;
  }, result);
};


interface SVGObjectProps {
  object: DrawingObject;
}

export const SVGObject: React.FC<SVGObjectProps> = ({ object }) => {
  const tool = useSelector(getTool);
  const drawing = useSelector(getDrawing);
  const [isSelected, setSelected] = useState(false);
  const { type } = object;

  const handleClick = (): void => {
    tool === 'cursor' && setSelected(!isSelected);
  };

  const props: SVGObjectComponentProps = {
    selected: isSelected,
    onClick: handleClick,
    object,
  };

  useEffect(() => {
    if (drawing) setSelected(false);
  }, [drawing]);

  if (type === 'line') return <SVGLine {...props} />;
  if (type === 'rect') return <SVGRect {...props} />;

  return null;
};
