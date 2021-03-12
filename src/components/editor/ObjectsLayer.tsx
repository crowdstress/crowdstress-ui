import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layer } from '@/components/editor/Layer';
import { SVGCross } from '@/components/svg/SVGCross';
import { SVGObject } from '@/components/svg/SVGObject';
import { DEFAULT_CROSS_SIZE, DRAWING_OBJECT_ID } from '@/config';
import { DrawingObject, DrawingObjectPoint } from '@/models/drawingObject';
import { LayerEvent, LayerSize } from '@/models/layer';
import { Tool } from '@/models/tool';
import { setParams } from '@/store/editor/params/actions';
import {
  getDrawing,
  getGridSize,
  getIsLocked,
  getSnapToGrid,
  getTool
} from '@/store/editor/selectors';
import { addObject } from '@/store/project/objects/actions';
import { getPresentObjects } from '@/store/project/selectors';
import { getPointCoords } from '@/utils/getPointCoords';

interface ObjectsLayerComponentProps {
  drawing: boolean;
  gridSize: number;
  isLocked: boolean;
  objects: DrawingObject[];
  snapToGrid: boolean;
  tool: Tool;
}

export const ObjectsLayerComponent: React.FC<ObjectsLayerComponentProps> = ({ drawing, gridSize, isLocked, objects, snapToGrid, tool }) => {
  const dispatch = useDispatch();
  const [points, setPoints] = useState<DrawingObjectPoint[]>([]);
  const [cursorPosition, setCursorPosition] = useState<DrawingObjectPoint | null>(null);

  const handleMount = (layerSize: LayerSize): void => {
    dispatch(setParams({ layerSize }));
  };

  const handleMouseMove = ({ x, y }: LayerEvent): void => {
    const point = getPointCoords(x, y, {
      gridSize,
      snapToGrid,
    });
    setCursorPosition(point);
  };

  const handleMouseDown = ({ x, y }: LayerEvent): void => {
    if (tool === 'cursor' || isLocked) return;

    const point = getPointCoords(x, y, {
      gridSize,
      snapToGrid,
    });

    if (!drawing) dispatch(setParams({ drawing: true }));
    setPoints([...points, point]);
  };

  const handleRightClick = (): void => {
    if (drawing) dispatch(setParams({ drawing: false }));
    if (points.length) setPoints([]);
  };

  useEffect(() => {
    if (tool === 'cursor' || tool === 'human') return;

    const isLineDone = points.length === 2 && tool === 'line';
    const isRectEllipseSeparatorDone = points.length === 2 && (tool === 'rect' || tool === 'ellipse' || tool === 'separator');
    const isQCurveDone = points.length === 3 && tool === 'qcurve';

    const object: DrawingObject = {
      id: Date.now().toString(),
      points,
      state: 'done',
      type: tool,
    };

    if (isRectEllipseSeparatorDone) {
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

  return objects ?
    <Layer
      onMount={handleMount}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onRightClick={handleRightClick}
    >
      { objects.map((object, index) => <SVGObject key={`object-${index}`} object={object} />) }
      {
        drawing && cursorPosition && tool !== 'cursor' && tool !== 'human' &&
      <SVGObject
        object={{
          id: DRAWING_OBJECT_ID,
          points: [...points, cursorPosition],
          state: 'in-progress',
          type: tool,
        }} />
      }
      {
        cursorPosition && tool !== 'cursor' && tool !== 'human' &&
      <SVGCross position={cursorPosition} size={DEFAULT_CROSS_SIZE} />
      }
    </Layer> :
    null;
};

export const ObjectsLayer: React.FC = () => {
  const tool = useSelector(getTool);
  const snapToGrid = useSelector(getSnapToGrid);
  const isLocked = useSelector(getIsLocked);
  const drawing = useSelector(getDrawing);
  const gridSize = useSelector(getGridSize);
  const objects = useSelector(getPresentObjects);

  return objects
    ? <ObjectsLayerComponent
      drawing={drawing}
      gridSize={gridSize}
      isLocked={isLocked}
      objects={objects}
      snapToGrid={snapToGrid}
      tool={tool} />
    : null;
};
