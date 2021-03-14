import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { GridLayer } from '@/components/editor/layers/GridLayer';
import { HumansLayer } from '@/components/editor/layers/HumansLayer';
import { ObjectsLayer } from '@/components/editor/layers/ObjectsLayer';
// import { RoomsLayer } from '@/components/editor/layers/RoomsLayer';
import { Actions } from '@/components/editor/modules/Actions';
import { Params } from '@/components/editor/modules/Params';
import { Running } from '@/components/editor/modules/Running';
import { Tools } from '@/components/editor/modules/Tools';
import { useKeyboard } from '@/hooks/useKeyboard';
import { getSnapToGrid } from '@/store/editor/selectors';

const EditorCanvas = styled.div`
  flex: 1;
  position: relative;
  grid-area: canvas;
`;

export const EditorComponent: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);

  useKeyboard();

  return <React.Fragment>
    <Tools />
    <Params />
    <Actions />
    <Running />
    <EditorCanvas>
      { snapToGrid && <GridLayer/> }
      <HumansLayer/>
      {/*<RoomsLayer />*/}
      <ObjectsLayer/>
    </EditorCanvas>
  </React.Fragment>;
};
