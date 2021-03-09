import { User } from '@/models/user';

export interface WhoamiReply {
  user: User;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface LoginReply {
  user: User;
}

export interface SignupArgs {
  email: string;
  password: string;
}

export interface SignupReply {
  user: User;
}
