import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layer } from '@/components/editor/Layer';
import { DEFAULT_HUMAN_DISTANCE, HUMAN_PANIC_HSL, HUMAN_SIZE } from '@/config';
import { DrawingObjectPoint } from '@/models/drawingObject';
import { Human } from '@/models/human';
import { LayerEvent } from '@/models/layer';
import { Tool } from '@/models/tool';
import { getTool } from '@/store/editor/selectors';
import { addHuman } from '@/store/project/humans/actions';
import { getHumans } from '@/store/project/selectors';
import { randomInt } from '@/utils/randomInt';

interface HumansLayerComponentProps {
  humans: Human[];
  tool: Tool;
}

const HumansLayerComponent: React.FC<HumansLayerComponentProps> = ({ humans, tool }) => {
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
    if (!humans) return;

    const isHumanNear = humans.find(({ coords }) => {
      const dx = point.x - coords.x;
      const dy = point.y - coords.y;
      return Math.sqrt(dx ** 2 + dy ** 2) <= HUMAN_SIZE * 2 + DEFAULT_HUMAN_DISTANCE;
    });
    if (isHumanNear) return;
    dispatch(addHuman({
      coords: point,
      panic: randomInt(0, 25),
      passedExits: [],
      targetSection: null,
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
          fill: `hsl(${H - 100 / H * panic}, ${S}, ${L})`,
          r: HUMAN_SIZE,
        };
        return <circle key={`human-${index}`} {...props} />;
      })
    }
  </Layer>;
};

export const HumansLayer: React.FC = () => {
  const tool = useSelector(getTool);
  const humans = useSelector(getHumans);

  return humans ? <HumansLayerComponent humans={humans} tool={tool} /> : null;
};
