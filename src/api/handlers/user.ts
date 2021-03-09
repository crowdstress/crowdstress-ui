import {
  LoginArgs,
  LoginReply,
  SignupArgs,
  SignupReply,
  WhoamiReply
} from '@/api/user';
import { AxiosReply, AxiosRequestConfig, rest } from '@/utils/rest';

export const logIn = (args: LoginArgs, config?: AxiosRequestConfig): AxiosReply<LoginReply> =>
  rest.post('/api/login', args, config);

export const logOut = (config?: AxiosRequestConfig): AxiosReply<''> =>
  rest.get('/api/logout', config);

export const signUp = (args: SignupArgs, config?: AxiosRequestConfig): AxiosReply<SignupReply> =>
  rest.post('/api/signup', args, config);

export const whoami = (config?: AxiosRequestConfig): AxiosReply<WhoamiReply> =>
  rest.get('/api/whoami', config);
