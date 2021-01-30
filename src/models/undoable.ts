export interface Undoable<T> {
  readonly past: readonly T[];
  readonly present: T;
  readonly future: readonly T[];
}
