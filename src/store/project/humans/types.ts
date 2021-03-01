import { Action } from '@/models/store';
import { Human } from '@/models/human';

export const ADD_HUMAN = 'project/ADD_HUMAN' as const;
export const SET_HUMANS = 'project/SET_HUMANS' as const;
export type AddHumanAction = Action<typeof ADD_HUMAN, Human>;
export type SetHumansAction = Action<typeof SET_HUMANS, Human[]>;
export type HumansAction = AddHumanAction | SetHumansAction;
export const defaultHumans: Human[] = [];
