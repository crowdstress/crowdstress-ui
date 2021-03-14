import * as React from 'react';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';

import { EditorProjectMiddleware } from '@/components/editor/middlewares/EditorProjectMiddleware';
import { EditorLocationState } from '@/models/editor';

export const Editor: React.FC = () => {
  const { state } = useLocation<EditorLocationState>();
  const shouldRedirect = !state || !state.id;

  return shouldRedirect ? <Redirect to="/" /> : <EditorProjectMiddleware />;
};
