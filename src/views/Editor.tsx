import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Actions } from '@/components/editor/Actions';
import { GridLayer } from '@/components/editor/GridLayer';
import { HumansLayer } from '@/components/editor/HumansLayer';
import { ObjectsLayer } from '@/components/editor/ObjectsLayer';
import { Params } from '@/components/editor/Params';
import { RoomsLayer } from '@/components/editor/RoomsLayer';
import { Running } from '@/components/editor/Running';
import { Tools } from '@/components/editor/Tools';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useWasm } from '@/hooks/useWasm';
import { getSnapToGrid } from '@/store/editor/selectors';
import { resetProject } from '@/store/project/actions';
import { getIsInitialized } from '@/store/project/selectors';

const EditorLayout = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EditorCanvas = styled.div`
  flex: 1;
  position: relative;
  grid-area: canvas;
`;

const EditorLoader = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditorView: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);
  const dispatch = useDispatch();
  const [WasmProvider, wasm] = useWasm();
  const { state } = wasm;

  const handleBeforeUnload = (e: Event): boolean => {
    // side-effects
    e.returnValue = true;
    return e.returnValue;
  };

  useKeyboard();

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return (): void => {
      dispatch(resetProject());
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <EditorLayout>
    <WasmProvider value={wasm}>
      {
        state === 'pending' &&
        <EditorLoader>
          Loading WebAssembly...
        </EditorLoader>
      }
      {
        state === 'error' &&
        <EditorLoader>
            Error loading WebAssembly...
        </EditorLoader>
      }
      {
        state === 'ready' &&
        <React.Fragment>
          <Tools />
          <Params />
          <Actions />
          <Running />
          <EditorCanvas>
            { snapToGrid && <GridLayer/> }
            <HumansLayer/>
            <RoomsLayer />
            <ObjectsLayer/>
          </EditorCanvas>
        </React.Fragment>
      }
    </WasmProvider>
  </EditorLayout>;
};

// Protector
export const Editor: React.FC = () => {
  const isProjectInitialized = useSelector(getIsInitialized);
  return isProjectInitialized ? <EditorView /> : <Redirect to="/" />;
};
