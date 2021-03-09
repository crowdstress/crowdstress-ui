import { Action } from '@/models/store';
import { User } from '@/models/user';

export const SET_USER = 'app/SET_USER' as const;
export type SetUserPayload = User | null;
export type SetUserAction = Action<typeof SET_USER, SetUserPayload>;
export type UserAction = SetUserAction;
export const defaultUser = null;
