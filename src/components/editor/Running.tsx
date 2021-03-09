import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRooms, fetchWalls } from '@/api/handlers/objects';
import { GetRoomsReply, GetWallsReply } from '@/api/objects';
import IconRun from '@/assets/svg/menu/run.svg';
import { getToolbarButtonMargin, Toolbar, ToolbarButtonWithTooltip, ToolbarDirection } from '@/components/ui/Toolbar';
import { tooltipTextWithShortcut } from '@/components/ui/Tooltip';
import { OPENCV_APPROXIMATE_EPS, SHORTCUT_RUN } from '@/config';
import { useLoadedWasm } from '@/hooks/useWasm';
import { convertObjectsToRust } from '@/models/drawingObject';
import { Exit } from '@/models/exit';
import { convertHumansToRust, Human } from '@/models/human';
import { Room } from '@/models/room';
import { Section } from '@/models/section';
import { WasmApp } from '@/models/wasmApp';
import { setRooms } from '@/store/editor/rooms/actions';
import { getLayerSize } from '@/store/editor/selectors';
import { setHumans } from '@/store/project/humans/actions';
import { getHumans, getPresentObjects, getRunAbility } from '@/store/project/selectors';

const TOOLBAR_DIRECTION: ToolbarDirection = 'column';
const TOOLBAR_BUTTON_MARGIN = getToolbarButtonMargin(TOOLBAR_DIRECTION);

export const Running: React.FC = () => {
  const objects = useSelector(getPresentObjects);
  const humans = useSelector(getHumans);
  const layerSize = useSelector(getLayerSize);
  const canRun = useSelector(getRunAbility);
  const dispatch = useDispatch();
  const { wasm } = useLoadedWasm();

  const run = async (): Promise<void> => {
    const resRooms = await processRooms();
    if (!(resRooms.__state === 'success' && resRooms.data)) {
      alert('err');
      return;
    }
    const { data: rooms } = resRooms;
    dispatch(setRooms(rooms));

    const resWalls = await processWalls();
    if (!(resWalls.__state === 'success' && resWalls.data)) {
      alert('err');
      return;
    }
    const { data: walls } = resWalls;

    const exits: Exit[] = objects.filter(object => object.type === 'separator').map(object => ({
      id: object.id,
      section: {
        end: object.points[1],
        start: object.points[0],
      },
    }));

    start(humans, rooms, walls, exits);
  };

  const start = (humans: Human[], rooms: Room[], walls: Section[], exits: Exit[]): void => {
    if (!wasm) {
      alert('err');
      return;
    }

    const app: WasmApp = {
      exits,
      humans: convertHumansToRust(humans),
      rooms,
      started: true,
      walls,
    };
    render(app);
  };

  const render = (app: WasmApp): void => {
    if (!wasm) {
      alert('err');
      return;
    }

    const { tick } = wasm;

    const result = tick(app);
    dispatch(setHumans(result.humans));

    requestAnimationFrame(() => render(result));
  };

  const processRooms = async (): Promise<GetRoomsReply> => {
    const { width, height } = layerSize;
    return await fetchRooms({
      epsilon: OPENCV_APPROXIMATE_EPS,
      height,
      objects: convertObjectsToRust(objects),
      width,
    });
  };

  const processWalls = async (): Promise<GetWallsReply> => {
    return await fetchWalls({ objects: convertObjectsToRust(objects) });
  };

  return <Toolbar
    position={{
      horizontal: 'right',
      vertical: 'top',
    }}
    direction={TOOLBAR_DIRECTION}
  >
    <ToolbarButtonWithTooltip
      margin={TOOLBAR_BUTTON_MARGIN}
      tooltipPosition="bottom"
      text={tooltipTextWithShortcut('Run', SHORTCUT_RUN)}
      disabled={!canRun}
      onClick={run}
    >
      <IconRun />
    </ToolbarButtonWithTooltip>
  </Toolbar>;
};
