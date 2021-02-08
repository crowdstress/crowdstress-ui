import * as React from 'react';
import '@/styles/menubar.scss';
import IconSave from '@/assets/svg/menu/save.svg';
import IconUndo from '@/assets/svg/menu/undo.svg';
import IconRedo from '@/assets/svg/menu/redo.svg';
import IconClear from '@/assets/svg/menu/clear.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getClearAbility,
  getRedoAbility,
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

export const Menubar: React.FC = () => {
  const canUndo = useSelector(getUndoAbility);
  const canRedo = useSelector(getRedoAbility);
  const canClear = useSelector(getClearAbility);
  const dispatch = useDispatch();

  return <React.Fragment>
    <button className="menubar__item">
      <div className="icon-wrapper-m">
        <IconSave className="icon-black" />
      </div>
    </button>
    <button
      className={getClassName('menubar__item', canUndo ? '' : 'menubar__item_disabled')}
      onClick={(): Action<typeof UNDO> => dispatch(undo())}
    >
      <div className="icon-wrapper-m">
        <IconUndo className="icon-black" />
      </div>
    </button>
    <button
      className={getClassName('menubar__item', canRedo ? '' : 'menubar__item_disabled')}
      onClick={(): Action<typeof REDO> => dispatch(redo())}
    >
      <div className="icon-wrapper-m">
        <IconRedo className="icon-black" />
      </div>
    </button>
    <button
      className={getClassName('menubar__item', canClear ? '' : 'menubar__item_disabled')}
      onClick={(): Action<typeof RESET> => dispatch(reset())}
    >
      <div className="icon-wrapper-m">
        <IconClear className="icon-black" />
      </div>
    </button>
  </React.Fragment>;
};
