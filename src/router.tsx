import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Editor } from '@/views/Editor';
import { Main } from '@/views/Main';
import { NewProject } from '@/views/NewProject';
import { Layout } from '@/components/Layout';

export const Router: React.FC = () => {
  return <BrowserRouter>
    <Switch>
      <Layout>
        <Route exact path="/editor" component={Editor} />
        <Route exact path="/new" component={NewProject} />
        <Route exact path="/" component={Main} />
      </Layout>
    </Switch>
  </BrowserRouter>;
};
