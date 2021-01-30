import * as React from 'react';
import { ObjectsLayer } from '@/components/editor/ObjectsLayer';
import '@/styles/editor.scss';
import { useSelector } from 'react-redux';
import { getSnapToGrid } from '@/store/editor/params';
import { GridLayer } from '@/components/editor/GridLayer';

export const Editor: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);

  return <div className="editor">
    { snapToGrid && <GridLayer /> }
    <ObjectsLayer />
  </div>;
};
