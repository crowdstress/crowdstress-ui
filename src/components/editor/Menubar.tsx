import * as React from 'react';
import '@/styles/menubar.scss';
import IconSave from '@/assets/svg/menu/save.svg';
import IconUndo from '@/assets/svg/menu/undo.svg';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconClear from '@/assets/svg/menu/clear.svg';
import IconRun from '@/assets/svg/menu/run.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPresentObjects,
  getRedoAbility,
  getResetAbility,
  getRunAbility,
  getUndoAbility
} from '@/store/editor/objects';
import { getClassName } from '@/utils/getClassName';
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
import { getHumans, setHumans } from '@/store/editor/humans';
import { Exit } from '@/models/exit';
import { Section } from '@/models/section';

interface MenubarButtonProps {
  enabled?: boolean;
  onClick?: () => void;
}

const MenubarButton: React.FC<MenubarButtonProps> =
  ({ enabled = true, onClick, children }) =>
    <button
      className={getClassName('menubar__item', enabled ? '' : 'menubar__item_disabled')}
      onClick={onClick}
      disabled={!enabled}
    >
      <div className="icon-wrapper-m">
        {children}
      </div>
    </button>;

export const Menubar: React.FC = () => {
  const objects = useSelector(getPresentObjects);
  const humans = useSelector(getHumans);
  const layerSize = useSelector(getLayerSize);
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const canReset = useSelector(getResetAbility);
  const canRun = useSelector(getRunAbility);
  const dispatch = useDispatch();
  const { wasm } = useLoadedWasm();

  const clear = (): void => {
    dispatch(reset());
    dispatch(setRooms([]));
  };

  const run = async (): Promise<void> => {
    const roomsRes = await processRooms();
    if (!(roomsRes.__state === 'success' && roomsRes.data)) {
      alert('err');
      return;
    }
    dispatch(setRooms(roomsRes.data));

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

    start(humans, walls, exits);
  };

  const start = (humans: Human[], walls: Section[], exits: Exit[]): void => {
    if (!wasm) {
      alert('err');
      return;
    }

    const app: App = {
      started: true,
      humans: convertHumansToRust(humans),
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

  return <div className="menubar">
    <div className="flx-aic">
      <MenubarButton>
        <IconSave className="icon-black" />
      </MenubarButton>
      <MenubarButton enabled={canUndo} onClick={(): Action<typeof UNDO> => dispatch(undo())}>
        <IconUndo className="icon-black" />
      </MenubarButton>
      <MenubarButton enabled={canRedo} onClick={(): Action<typeof REDO> => dispatch(redo())}>
        <IconRedo className="icon-black" />
      </MenubarButton>
      <MenubarButton enabled={canReset} onClick={clear}>
        <IconClear className="icon-black" />
      </MenubarButton>
    </div>
    <div className="flx-aic">
      <MenubarButton enabled={canRun} onClick={run}>
        <IconRun className="icon-black" />
      </MenubarButton>
    </div>
  </div>;
};
