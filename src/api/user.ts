import { User } from '@/models/user';

export type WhoamiReply = {
  user: User;
}

export type LoginArgs = {
  email: string;
  password: string;
}

export type LoginReply = {
  user: User;
}

export type SignupArgs = {
  email: string;
  password: string;
}

export type SignupReply = {
  user: User;
}
