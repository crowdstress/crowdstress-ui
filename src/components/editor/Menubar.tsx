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
  getRedoAbility, getRunAbility,
  getUndoAbility
} from '@/store/editor/objects';
import { getClassName } from '@/utils/getClassName';
import {
  REDO,
  RESET,
  UNDO,
  redo,
  reset,
  undo
} from '@/store/undoable';
import { Action } from '@/models/store';

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
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const canReset = useSelector(getResetAbility);
  const canRun = useSelector(getRunAbility);
  const dispatch = useDispatch();

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
      <MenubarButton enabled={canReset} onClick={(): Action<typeof RESET> => dispatch(reset())}>
        <IconClear className="icon-black" />
      </MenubarButton>
    </div>
    <div className="flx-aic">
      <MenubarButton enabled={canRun}>
        <IconRun className="icon-black" />
      </MenubarButton>
    </div>
  </div>;
};
