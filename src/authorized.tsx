import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { getUser } from '@/store/app/selectors';
import { Editor } from '@/views/Editor';
import { Main } from '@/views/Main';
import { NewProject } from '@/views/NewProject';

const AuthorizedView: React.FC = () =>
  <Switch>
    <Route exact path="/editor" component={Editor} />
    <Route exact path="/new" component={NewProject} />
    <Route exact path="/" component={Main} />
  </Switch>;

// Authorized
export const Authorized: React.FC = () => {
  const user = useSelector(getUser);
  return user ? <AuthorizedView /> : <Redirect to="/login" />;
};
