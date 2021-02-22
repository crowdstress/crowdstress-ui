import { Action, ActionCreator, RootSelector } from '@/models/store';
import { Human } from '@/models/human';
import { Reducer } from 'redux';

export const ADD_HUMAN = 'editor/ADD_HUMAN' as const;
export const SET_HUMANS = 'editor/SET_HUMANS' as const;

type AddHumanAction = Action<typeof ADD_HUMAN, Human>;
type AddHumanActionCreator = ActionCreator<typeof ADD_HUMAN, Human>;
type SetHumansAction = Action<typeof SET_HUMANS, Human[]>;
type SetHumansActionCreator = ActionCreator<typeof SET_HUMANS, Human[]>;

export const addHuman: AddHumanActionCreator = payload => ({
  type: ADD_HUMAN,
  payload,
});

export const setHumans: SetHumansActionCreator = payload => ({
  type: SET_HUMANS,
  payload,
});

export const defaultHumans: Human[] = [];

export const humans: Reducer<Human[], AddHumanAction | SetHumansAction> =
    (state = defaultHumans, action) => {
      if (action.type === ADD_HUMAN) {
        return [
          ...state,
          action.payload,
        ];
      }

      if (action.type === SET_HUMANS) {
        return action.payload;
      }

      return state;
    };

export const getHumans: RootSelector<Human[]> = state => state.editor.humans;
