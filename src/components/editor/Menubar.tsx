import * as React from 'react';
import '@/styles/menubar.scss';
import IconSave from '@/assets/svg/menu/save.svg';
import IconUndo from '@/assets/svg/menu/undo.svg';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconClear from '@/assets/svg/menu/clear.svg';
import IconRun from '@/assets/svg/menu/run.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  REDO,
  redo,
  reset,
  UNDO,
  undo
} from '@/store/undoable';
import { Action } from '@/models/store';
import { getLayerSize } from '@/store/editor/params';
import { fetchRooms, fetchWalls } from '@/api/handlers/objects';
import { setRooms } from '@/store/editor/rooms';
import { OPENCV_APPROXIMATE_EPS } from '@/config';
import { GetRoomsReply, GetWallsReply } from '@/api/objects';
import { convertObjectsToRust } from '@/models/drawingObject';
import { App } from '@/models/app';
import { useLoadedWasm } from '@/hooks/useWasm';
import { convertHumansToRust, Human } from '@/models/human';
import { Exit } from '@/models/exit';
import { Section } from '@/models/section';
import { Room } from '@/models/room';
import { useState } from 'react';
import {
  getPresentObjects,
  getRedoAbility,
  getResetAbility,
  getRunAbility,
  getUndoAbility
} from '@/store/project/objects/selectors';
import { getHumans } from '@/store/project/humans/selectors';
import { setHumans } from '@/store/project/humans/actions';
import { Bar, BarItem } from '@/components/ui/Bar';
import styled from 'styled-components';
import { BORDER_COLOR } from '@/components/ui/colors';

const MenubarBlock = styled(Bar)`
  grid-area: menubar;
  border-bottom: 1px solid ${BORDER_COLOR};
`;

export const Menubar: React.FC = () => {
  const objects = useSelector(getPresentObjects);
  const humans = useSelector(getHumans);
  const layerSize = useSelector(getLayerSize);
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const canReset = useSelector(getResetAbility);
  const canRun = useSelector(getRunAbility);
  const canSave = objects.length > 0;
  const [isSaveProject, setSaveProject] = useState(false);
  const dispatch = useDispatch();
  const { wasm } = useLoadedWasm();

  const clear = (): void => {
    dispatch(reset());
    dispatch(setRooms([]));
  };

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

  return <MenubarBlock>
    <div className="flx-aic">
      <BarItem onClick={(): void => setSaveProject(true)} disabled={!canSave}>
        <IconSave className="icon-black" />
      </BarItem>
      <BarItem onClick={(): Action<typeof UNDO> => dispatch(undo())} disabled={!canUndo}>
        <IconUndo className="icon-black" />
      </BarItem>
      <BarItem onClick={(): Action<typeof REDO> => dispatch(redo())} disabled={!canRedo}>
        <IconRedo className="icon-black" />
      </BarItem>
      <BarItem onClick={clear} disabled={!canReset}>
        <IconClear className="icon-black" />
      </BarItem>
    </div>
    <div className="flx-aic">
      <BarItem onClick={run} disabled={!canRun}>
        <IconRun className="icon-black" />
      </BarItem>
    </div>
  </MenubarBlock>;
};
