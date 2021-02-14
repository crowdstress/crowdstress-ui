import * as React from 'react';
import { DrawingObject } from '@/models/drawingObject';
import { SVGLine } from '@/components/svg/SVGLine';
import '@/styles/svg.scss';
import { SVGRect } from '@/components/svg/SVGRect';
import { useEffect, useState } from 'react';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { useSelector } from 'react-redux';
import { getDrawing } from '@/store/editor/params';
import { getTool } from '@/store/editor/tool';
import { SVGEllipse } from '@/components/svg/SVGEllipse';
import { SVGQCurve } from '@/components/svg/SVGQCurve';
import { SVGSeparator } from '@/components/svg/SVGSeparator';

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
