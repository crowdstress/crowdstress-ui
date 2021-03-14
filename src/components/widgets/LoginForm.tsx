import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { logIn } from '@/api/handlers/user';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Widget } from '@/components/ui/Widget';
import { setUser } from '@/store/app/user/actions';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = (type: 'email' | 'password') =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (type === 'email') setEmail(e.target.value);
      if (type === 'password') setPassword(e.target.value);
    };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const res = await logIn({
      email,
      password,
    });
    if (res.__state === 'success' && res.data) {
      dispatch(setUser(res.data.user));
    }
  };

  return <Widget title={'Login'}>
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder={'Email'}
        value={email}
        onChange={handleChange('email')}
        autoFocus
        required
      />
      <Input
        type="password"
        placeholder={'Password'}
        value={password}
        onChange={handleChange('password')}
        required
      />
      <Button
        type="submit"
        buttonDisplay="block"
        buttonStyle="primary"
        size="medium"
      >
        Login
      </Button>
    </form>
  </Widget>;
};
