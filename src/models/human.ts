import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';

export interface Human {
  coords: DrawingObjectPoint;
  panic: number;
  target: DrawingObjectPoint | null;
  passedExits: DrawingObjectID[];
}

export type RustHuman = Omit<Human, 'passedExits'> & { passed_exits: DrawingObjectID[]; };

export const convertHumansToRust = (humans: Human[]): RustHuman[] =>
  humans.map(({ coords, panic, target, passedExits }) => ({
    coords,
    panic,
    target,
    passed_exits: passedExits,
  }));
