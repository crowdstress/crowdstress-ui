export interface Undoable<T> {
  past: T[];
  present: T;
  future: T[];
}
