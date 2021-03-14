import { Human } from '@/models/human';
import { Action } from '@/models/store';

export const ADD_HUMAN = 'project/ADD_HUMAN' as const;
export const SET_HUMANS = 'project/SET_HUMANS' as const;
export type AddHumanPayload = Human;
export type AddHumanAction = Action<typeof ADD_HUMAN, AddHumanPayload>;
export type SetHumansPayload = Human[];
export type SetHumansAction = Action<typeof SET_HUMANS, SetHumansPayload>;
export type HumansAction = AddHumanAction | SetHumansAction;
export const defaultHumans: Human[] = [];
