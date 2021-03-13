import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import { Content } from '@/components/ui/Content';
import { LoginForm } from '@/components/widgets/LoginForm';
import { SignupForm } from '@/components/widgets/SignupForm';
import { getUser } from '@/store/app/selectors';

const AuthView: React.FC = () => {
  const { pathname } = useLocation();

  return <div className="flx-aic-jcc flx-item-1">
    <Content>
      { pathname === '/login' ? <LoginForm /> : <SignupForm /> }
    </Content>
  </div>;
};

export const Auth: React.FC = () => {
  const user = useSelector(getUser);

  return user ? <Redirect to="/" /> : <AuthView />;
};
