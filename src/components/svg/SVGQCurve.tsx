import * as React from 'react';
import { SVGObjectComponentProps } from '@/components/svg/props';
import { SVGGroup } from '@/components/svg/SVGGroup';
import { getClassName } from '@/utils/getClassName';
import { DrawingObjectPoint } from '@/models/drawingObject';

type SVGQCurvePathsProps = Omit<SVGObjectComponentProps, 'onClick'>;

const SVGQCurvePaths: React.FC<SVGQCurvePathsProps> = ({ object, selected }) => {
  const { points, state } = object;
  if (points.length < 3) return null;
  const [startPoint, controlPoint, endPoint] = points;
  const d = `M ${startPoint.join(' ')} Q ${controlPoint.join(' ')}, ${endPoint.join(' ')}`;
  return <React.Fragment>
    <path
      className={getClassName(
        'svg-object',
        state === 'in-progress' ? 'svg-object_drawing' : '',
        selected ? 'svg-object_selected' : ''
      )}
      d={d}
    />
    { state === 'done' && <path className="svg-hover-area" d={d} /> }
  </React.Fragment>;
};

interface SVGQCurveHelpersProps {
  points: readonly DrawingObjectPoint[]
}

const SVGQCurveHelpers: React.FC<SVGQCurveHelpersProps> = ({ points }) => {
  const pointsString = points.map(point => point.join(',')).join(' ');
  return <polyline className="svg-helper" points={pointsString} />;
};

export const SVGQCurve: React.FC<SVGObjectComponentProps> = ({ object, onClick, selected }) => {
  const { points, state } = object;
  return <SVGGroup onClick={onClick}>
    <SVGQCurvePaths object={object} selected={selected} />
    { state === 'in-progress' && <SVGQCurveHelpers points={points} /> }
  </SVGGroup>;
};
