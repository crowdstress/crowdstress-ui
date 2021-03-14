import { App } from '@/models/app';
import { RootSelector } from '@/models/store';
import { createEqualSelector } from '@/store/createEqualSelector';

export const getApp: RootSelector<App> = state => state.app;

export const getUser = createEqualSelector(getApp, result => result.user);
