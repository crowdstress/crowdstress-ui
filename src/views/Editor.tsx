import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { getProject } from '@/api/handlers/projects';
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
import { EditorLocationState } from '@/models/editor';
import { getSnapToGrid } from '@/store/editor/selectors';
import { resetProject, setProject } from '@/store/project/actions';

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
  const location = useLocation<EditorLocationState>();
  const { id } = location.state;

  useKeyboard();

  const loadProject = async (): Promise<void> => {
    const res = await getProject({ id });
    if (res.__state === 'success' && res.data) {
      dispatch(setProject(res.data));
    }
  };

  useEffect(() => {
    loadProject().then();

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
  const { state } = useLocation<EditorLocationState>();
  const shouldRedirect = !state || !state.id;

  return shouldRedirect ? <Redirect to="/" /> : <EditorView />;
};
