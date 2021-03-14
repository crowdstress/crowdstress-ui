import { App } from '@/models/app';
import { Editor } from '@/models/editor';
import { ProjectState } from '@/models/project';

export type Action<T, P = void> = P extends void ? { type: T } : { type: T } & { payload: P };
export type ActionCreator<T, P = void> = P extends void ? () => Action<T> : (payload: P) => Action<T, P>;
export type RootSelector<T> = (state: State) => T;

export interface State {
  app: App;
  editor: Editor;
  project: ProjectState;
}
