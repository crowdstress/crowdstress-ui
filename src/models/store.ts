import { Editor } from '@/models/editor';

export type Action<T, P = void> = P extends void ? { type: T } : { type: T } & { payload: P };
export type ActionCreator<T, P = void> = P extends void ? () => Action<T> : (payload: P) => Action<T, P>;
export type RootSelector<T> = (state: State) => T;

export interface State {
  editor: Editor;
}
