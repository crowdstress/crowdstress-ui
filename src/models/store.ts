import { Editor } from '@/models/editor';

export type Action<T, P = void> = P extends void ? { readonly type: T } : { readonly type: T } & { readonly payload: P };
export type ActionCreator<T, P = void> = P extends void ? () => Action<T> : (payload: P) => Action<T, P>;
export type RootSelector<T> = (state: State) => T;

export interface State {
  readonly editor: Editor;
}
