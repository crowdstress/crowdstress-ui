import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Editor } from '@/views/Editor';
import { Main } from '@/views/Main';
import { NewProject } from '@/views/NewProject';

export const Router: React.FC = () => {
  return <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/editor" component={Editor} />
        <Route exact path="/new" component={NewProject} />
        <Route exact path="/" component={Main} />
      </Switch>
    </Layout>
  </BrowserRouter>;
};
