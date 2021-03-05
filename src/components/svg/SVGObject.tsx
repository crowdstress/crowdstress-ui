import { useEffect, useState } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { SVGObjectComponentProps } from '@/components/svg/props';
import { SVGEllipse } from '@/components/svg/SVGEllipse';
import { SVGLine } from '@/components/svg/SVGLine';
import { SVGQCurve } from '@/components/svg/SVGQCurve';
import { SVGRect } from '@/components/svg/SVGRect';
import { SVGSeparator } from '@/components/svg/SVGSeparator';
import { DrawingObject } from '@/models/drawingObject';
import { getDrawing, getTool } from '@/store/editor/selectors';
import '@/styles/svg.scss';

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
    object,
    onClick: handleClick,
    selected: isSelected,
  };

  useEffect(() => {
    if (drawing) setSelected(false);
  }, [drawing]);

  useEffect(() => {
    setSelected(false);
  }, [tool]);

  if (type === 'line') return <SVGLine {...props} />;
  if (type === 'rect') return <SVGRect {...props} />;
  if (type === 'ellipse') return <SVGEllipse {...props} />;
  if (type === 'qcurve') return <SVGQCurve {...props} />;
  if (type === 'separator') return <SVGSeparator {...props} />;

  return null;
};
