export interface Undoable<T> {
  future: T[];
  past: T[];
  present: T;
}
