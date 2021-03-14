import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import { getProject } from '@/api/handlers/projects';
import { EditorLoader } from '@/components/editor/EditorLoader';
import { EditorWasmMiddleware } from '@/components/editor/middlewares/EditorWasmMiddleware';
import { flxCol } from '@/components/ui/flex';
import { ComponentState } from '@/models/component';
import { EditorLocationState } from '@/models/editor';
import { resetProject, setProject } from '@/store/project/actions';

const EditorLayout = styled.div`
  position: relative;
  flex: 1;
  ${flxCol};
`;

export const EditorProjectMiddleware: React.FC = () => {
  const [state, setState] = useState<ComponentState>('pending');
  const location = useLocation<EditorLocationState>();
  const { id } = location.state;
  const dispatch = useDispatch();

  const loadProject = async (): Promise<void> => {
    const res = await getProject({ id });
    if (res.__state === 'success' && res.data) {
      dispatch(setProject(res.data));
      setState('ready');
    }
  };

  useEffect(() => {
    loadProject().then();

    return (): void => {
      dispatch(resetProject());
    };
  }, []);

  return <EditorLayout>
    { state === 'pending' && <EditorLoader>Loading project...</EditorLoader> }
    { state === 'ready' && <EditorWasmMiddleware /> }
    { state === 'error' && <EditorLoader>Error</EditorLoader> }
  </EditorLayout>;
};
