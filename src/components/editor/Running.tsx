import React from 'react';
import { Toolbar, ToolbarButton } from '@/components/ui/Toolbar';
import { setRooms } from '@/store/editor/rooms';
import { Exit } from '@/models/exit';
import { convertHumansToRust, Human } from '@/models/human';
import { Room } from '@/models/room';
import { Section } from '@/models/section';
import { App } from '@/models/app';
import { setHumans } from '@/store/project/humans/actions';
import { GetRoomsReply, GetWallsReply } from '@/api/objects';
import { fetchRooms, fetchWalls } from '@/api/handlers/objects';
import { OPENCV_APPROXIMATE_EPS } from '@/config';
import { convertObjectsToRust } from '@/models/drawingObject';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadedWasm } from '@/hooks/useWasm';
import { getPresentObjects, getRunAbility } from '@/store/project/objects/selectors';
import { getHumans } from '@/store/project/humans/selectors';
import { getLayerSize } from '@/store/editor/params';
import IconRun from '@/assets/svg/menu/run.svg';

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
        start: object.points[0],
        end: object.points[1],
      },
    }));

    start(humans, rooms, walls, exits);
  };

  const start = (humans: Human[], rooms: Room[], walls: Section[], exits: Exit[]): void => {
    if (!wasm) {
      alert('err');
      return;
    }

    const app: App = {
      started: true,
      humans: convertHumansToRust(humans),
      rooms,
      walls,
      exits,
    };
    render(app);
  };

  const render = (app: App): void => {
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
      width,
      height,
      epsilon: OPENCV_APPROXIMATE_EPS,
      objects: convertObjectsToRust(objects),
    });
  };

  const processWalls = async (): Promise<GetWallsReply> => {
    return await fetchWalls({ objects: convertObjectsToRust(objects) });
  };

  return <Toolbar position={{
    vertical: 'top',
    horizontal: 'right',
  }} direction="row">
    <ToolbarButton margin="right" disabled={!canRun} onClick={run}>
      <IconRun />
    </ToolbarButton>
  </Toolbar>;
};
