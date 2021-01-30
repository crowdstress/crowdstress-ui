import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Editor } from '@/views/Editor';

export const Router: React.FC = () =>
  <BrowserRouter>
    <Route exact path="/editor" component={Editor} />
  </BrowserRouter>;
