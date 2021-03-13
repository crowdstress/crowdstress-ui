import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { getUser } from '@/store/app/selectors';
import { Editor } from '@/views/Editor';
import { Projects } from '@/views/Projects';

const AuthorizedView: React.FC = () =>
  <Switch>
    <Route exact path="/editor" component={Editor} />
    <Route exact path="/projects" component={Projects} />
    <Redirect to="/projects" />
  </Switch>;

// Authorized
export const Authorized: React.FC = () => {
  const user = useSelector(getUser);
  return user ? <AuthorizedView /> : <Redirect to="/login" />;
};
