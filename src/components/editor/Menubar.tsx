import * as React from 'react';
import '@/styles/menubar.scss';
import IconSave from '@/assets/svg/menu/save.svg';
import IconUndo from '@/assets/svg/menu/undo.svg';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconClear from '@/assets/svg/menu/clear.svg';
import IconRun from '@/assets/svg/menu/run.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getResetAbility,
  getRedoAbility,
  getRunAbility,
  getUndoAbility,
  getPresentObjects
} from '@/store/editor/objects';
import { getClassName } from '@/utils/getClassName';
import {
  REDO,
  UNDO,
  redo,
  reset,
  undo
} from '@/store/undoable';
import { Action } from '@/models/store';
import { getLayerSize } from '@/store/editor/params';
import { getRooms } from '@/api/handlers/objects';
import { drawingObjectTypes } from '@/models/drawingObject';
import { setRooms } from '@/store/editor/rooms';
import { OPENCV_APPROXIMATE_EPS } from '@/config';

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
  const layerSize = useSelector(getLayerSize);
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const canReset = useSelector(getResetAbility);
  const canRun = useSelector(getRunAbility);
  const dispatch = useDispatch();

  const clear = (): void => {
    dispatch(reset());
    dispatch(setRooms([]));
  };

  const run = async (): Promise<void> => {
    const { width, height } = layerSize;
    const res = await getRooms({
      width,
      height,
      epsilon: OPENCV_APPROXIMATE_EPS,
      objects: objects.map(object => ({
        ...object,
        object_type: drawingObjectTypes.indexOf(object.type),
      })),
    });
    if (res.__state === 'success' && res.data) {
      dispatch(setRooms(res.data));
    }
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
