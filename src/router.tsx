import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { whoami } from '@/api/handlers/user';
import { Authorized } from '@/authorized';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/ui/Loader';
import { setUser } from '@/store/app/user/actions';
import { Auth } from '@/views/Auth';

export const Router: React.FC = () => {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();

  const fetchUser = async (): Promise<void> => {
    const res = await whoami();
    if (res.__state === 'success' && res.data) {
      dispatch(setUser(res.data.user));
    }
    setReady(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <BrowserRouter>
    <Layout>
      {
        isReady ?
          <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/signup" component={Auth} />
            <Route path="/" component={Authorized} />
          </Switch> :
          <Loader />
      }
    </Layout>
  </BrowserRouter>;
};
