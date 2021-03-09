import { combineReducers, Reducer } from 'redux';

import { App } from '@/models/app';
import { user } from '@/store/app/user/reducer';

export const app: Reducer<App> = combineReducers({ user });
