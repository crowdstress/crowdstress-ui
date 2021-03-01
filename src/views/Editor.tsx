import * as React from 'react';
import { ObjectsLayer } from '@/components/editor/ObjectsLayer';
import { useDispatch, useSelector } from 'react-redux';
import { getSnapToGrid } from '@/store/editor/params';
import { GridLayer } from '@/components/editor/GridLayer';
import { Toolbar } from '@/components/editor/Toolbar';
import { Menubar } from '@/components/editor/Menubar';
import { HumansLayer } from '@/components/editor/HumansLayer';
import { useWasm } from '@/hooks/useWasm';
import { RoomsLayer } from '@/components/editor/RoomsLayer';
import { useEffect } from 'react';
import { resetProject } from '@/store/project/actions';
import { getIsInitialized } from '@/store/project/selectors';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const EditorLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EditorCanvas = styled.div`
  position: relative;
  grid-area: canvas;
`;

const EditorLoader = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditorLayoutInner = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 4em 1fr;
  grid-gap: 0;
  grid-template-areas:
    "menubar menubar"
    "toolbar canvas";
`;

export const EditorView: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);
  const dispatch = useDispatch();
  const [WasmProvider, wasm] = useWasm();
  const { state } = wasm;

  useEffect(() => {
    return (): void => {
      dispatch(resetProject());
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
        <EditorLayoutInner>
          <Menubar />
          <Toolbar />
          <EditorCanvas>
            { snapToGrid && <GridLayer/> }
            <HumansLayer/>
            <RoomsLayer />
            <ObjectsLayer/>
          </EditorCanvas>
        </EditorLayoutInner>
      }
    </WasmProvider>
  </EditorLayout>;
};

// Protector
export const Editor: React.FC = () => {
  const isProjectInitialized = useSelector(getIsInitialized);
  return isProjectInitialized ? <EditorView /> : <Redirect to="/" />;
};
