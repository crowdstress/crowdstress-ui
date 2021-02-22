import * as React from 'react';
import { Layer } from '@/components/editor/Layer';
import { useDispatch, useSelector } from 'react-redux';
import { getTool } from '@/store/editor/tool';
import { LayerEvent } from '@/models/layer';
import { useState } from 'react';
import { DrawingObjectPoint } from '@/models/drawingObject';
import { DEFAULT_HUMAN_DISTANCE, HUMAN_PANIC_HSL, HUMAN_SIZE } from '@/config';
import { randomInt } from '@/utils/randomInt';
import { addHuman, getHumans } from '@/store/editor/humans';

export const HumansLayer: React.FC = () => {
  const tool = useSelector(getTool);
  const humans = useSelector(getHumans);
  const [drawing, setDrawing] = useState(false);
  const dispatch = useDispatch();

  const handleMouseDown = (point: LayerEvent): void => {
    setDrawing(true);
    placeHuman(point);
  };

  const handleMouseUp = (): void => {
    setDrawing(false);
  };

  const handleMouseMove = (point: LayerEvent): void => {
    if (!drawing) return;
    placeHuman(point);
  };

  const placeHuman = (point: DrawingObjectPoint): void => {
    const isHumanNear = humans.find(({ coords }) => {
      const dx = point.x - coords.x;
      const dy = point.y - coords.y;
      return Math.sqrt(dx ** 2 + dy ** 2) <= HUMAN_SIZE * 2 + DEFAULT_HUMAN_DISTANCE;
    });
    if (isHumanNear) return;
    dispatch(addHuman({
      coords: point,
      panic: randomInt(0, 25),
      target: null,
      passedExits: [],
    }));
  };

  return <Layer
    top={tool === 'human'}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
  >
    {
      humans.map(({ coords, panic }, index) => {
        const { x: cx, y: cy } = coords;
        const { H, S, L } = HUMAN_PANIC_HSL;
        const props: React.SVGProps<SVGCircleElement> = {
          cx,
          cy,
          r: HUMAN_SIZE,
          fill: `hsl(${H - 100 / H * panic}, ${S}, ${L})`,
        };
        return <circle key={`human-${index}`} {...props} />;
      })
    }
  </Layer>;
};
