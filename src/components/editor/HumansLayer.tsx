import * as React from 'react';
import { Layer } from '@/components/editor/Layer';
import { useSelector } from 'react-redux';
import { getTool } from '@/store/editor/tool';
import { LayerEvent } from '@/models/layer';
import { useState } from 'react';
import { Human } from '@/models/human';
import { DrawingObjectPoint, drawingObjectTypes } from '@/models/drawingObject';
import { DEFAULT_HUMAN_DISTANCE, HUMAN_PANIC_HSL, HUMAN_SIZE } from '@/config';
import { randomInt } from '@/utils/randomInt';
import { useLoadedWasm } from '@/hooks/useWasm';
import { getPresentObjects } from '@/store/editor/objects';

export const HumansLayer: React.FC = () => {
  const tool = useSelector(getTool);
  const objects = useSelector(getPresentObjects);
  const [humans, setHumans] = useState<Human[]>([]);
  const [drawing, setDrawing] = useState(false);
  const { wasm } = useLoadedWasm();

  const render = (app: any): void => {
    if (!wasm) return;
    const { tick } = wasm;

    const result = tick(app);
    setHumans(result.humans);

    requestAnimationFrame(() => render(result));
  };

  const init = (): void => {
    if (!wasm) return;
    const { init } = wasm;

    const wasm_humans = humans.map(human => ({
      ...human,
      passed_exits: [],
    }));

    const wasm_objects = objects.map(object => ({
      ...object,
      object_type: drawingObjectTypes.indexOf(object.type),
    }));

    const app = init(wasm_humans, wasm_objects);

    requestAnimationFrame(() => render(app));
  };

  const handleMouseDown = ({ x, y }: LayerEvent): void => {
    setDrawing(true);
    addHuman([x, y]);
  };

  const handleMouseUp = (): void => {
    setDrawing(false);
  };

  const handleMouseMove = ({ x, y }: LayerEvent): void => {
    if (!drawing) return;
    addHuman([x, y]);
  };

  const addHuman = (point: DrawingObjectPoint): void => {
    const isHumanNear = humans.find(({ coords }) => {
      const dx = point[0] - coords[0];
      const dy = point[1] - coords[1];
      return Math.sqrt(dx ** 2 + dy ** 2) <= HUMAN_SIZE * 2 + DEFAULT_HUMAN_DISTANCE;
    });
    if (isHumanNear) return;
    setHumans([
      ...humans,
      {
        coords: point,
        panic: randomInt(0, 25),
      },
    ]);
  };

  return <Layer
    top={tool === 'human'}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    onRightClick={init}
  >
    {
      humans.map(({ coords, panic }, index) => {
        const [cx, cy] = coords;
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
