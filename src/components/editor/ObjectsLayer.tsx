import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addObject, getPresentObjects } from '@/store/editor/objects';
import { Layer } from '@/components/editor/Layer';
import { SVGObject } from '@/components/svg/SVGObject';
import { getTool } from '@/store/editor/tool';
import {
  getDrawing,
  getGridSize,
  getIsLocked,
  getSnapToGrid,
  setParams
} from '@/store/editor/params';
import { useEffect, useState } from 'react';
import { DrawingObject, DrawingObjectPoint } from '@/models/drawingObject';
import { getPointCoords } from '@/utils/getPointCoords';
import { SVGCross } from '@/components/svg/SVGCross';
import { DEFAULT_CROSS_SIZE, DRAWING_OBJECT_ID } from '@/config';
import { LayerEvent } from '@/components/editor/props';

export const ObjectsLayer: React.FC = () => {
  const tool = useSelector(getTool);
  const snapToGrid = useSelector(getSnapToGrid);
  const isLocked = useSelector(getIsLocked);
  const drawing = useSelector(getDrawing);
  const gridSize = useSelector(getGridSize);
  const objects = useSelector(getPresentObjects);
  const dispatch = useDispatch();
  const [points, setPoints] = useState<DrawingObjectPoint[]>([]);
  const [cursorPosition, setCursorPosition] = useState<DrawingObjectPoint | null>(null);

  const handleMouseMove = ({ x, y }: LayerEvent): void => {
    const point = getPointCoords(x, y, {
      snapToGrid,
      gridSize,
    });
    setCursorPosition(point);
  };

  const handleMouseDown = ({ x, y }: LayerEvent): void => {
    if (tool === 'cursor' || isLocked) return;

    const point = getPointCoords(x, y, {
      snapToGrid,
      gridSize,
    });

    if (!drawing) dispatch(setParams({ drawing: true }));
    setPoints([...points, point]);
  };

  const handleRightClick = (): void => {
    if (drawing) dispatch(setParams({ drawing: false }));
    if (points.length) setPoints([]);
  };

  useEffect(() => {
    if (tool === 'cursor') return;

    const isLineDone = points.length === 2 && tool === 'line';
    const isRectOrEllipseDone = points.length === 2 && (tool === 'rect' || tool === 'ellipse');
    const isQCurveDone = points.length === 3 && tool === 'qcurve';

    const object: DrawingObject = {
      id: Date.now().toString(),
      type: tool,
      points,
      state: 'done',
    };

    if (isRectOrEllipseDone) {
      dispatch(addObject(object));
      dispatch(setParams({ drawing: false }));
      setPoints([]);
      return;
    }

    if (isLineDone || isQCurveDone) {
      dispatch(addObject(object));
      setPoints(points.slice(-1));
    }
  }, [points]);

  useEffect(() => {
    if (points.length) setPoints([]);
  }, [tool]);

  return <Layer
    onMouseMove={handleMouseMove}
    onMouseDown={handleMouseDown}
    onRightClick={handleRightClick}
  >
    { objects.map((object, index) => <SVGObject key={`object-${index}`} object={object} />) }
    {
      drawing && cursorPosition && tool !== 'cursor' &&
      <SVGObject object={{
        id: DRAWING_OBJECT_ID,
        type: tool,
        state: 'in-progress',
        points: [...points, cursorPosition],
      }} />
    }
    { cursorPosition && tool !== 'cursor' && <SVGCross position={cursorPosition} size={DEFAULT_CROSS_SIZE} /> }
  </Layer>;
};
