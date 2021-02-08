import * as React from 'react';
import { ObjectsLayer } from '@/components/editor/ObjectsLayer';
import '@/styles/editor.scss';
import { useSelector } from 'react-redux';
import { getSnapToGrid } from '@/store/editor/params';
import { GridLayer } from '@/components/editor/GridLayer';
import { Toolbar } from '@/components/editor/Toolbar';
import { Menubar } from '@/components/editor/Menubar';

export const Editor: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);

  return <div className="editor-layout">
    <div className="editor__menubar">
      <Menubar />
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
