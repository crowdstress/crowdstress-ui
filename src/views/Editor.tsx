import * as React from 'react';
import { ObjectsLayer } from '@/components/editor/ObjectsLayer';
import '@/styles/editor.scss';
import { useSelector } from 'react-redux';
import { getSnapToGrid } from '@/store/editor/params';
import { GridLayer } from '@/components/editor/GridLayer';
import { Toolbar } from '@/components/editor/Toolbar';

export const Editor: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);

  return <div className="editor-layout">
    <div className="editor__top-menu">
      <div className="flx-aic">
        <button className="editor__top-menu-item">File</button>
        <button className="editor__top-menu-item">Edit</button>
        <button className="editor__top-menu-item">View</button>
      </div>
    </div>
    <div className="editor__toolbar">
      <Toolbar />
    </div>
    <div className="editor__canvas">
      { snapToGrid && <GridLayer /> }
      <ObjectsLayer />
    </div>
  </div>;
};
