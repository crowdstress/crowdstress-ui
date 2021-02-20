import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';

export interface Human {
  coords: DrawingObjectPoint;
  panic: number;
  passedExits: DrawingObjectID[];
}

export type RustHuman = Omit<Human, 'passedExits'> & { passed_exits: DrawingObjectID[]; };

export const convertHumansToRust = (humans: Human[]): RustHuman[] =>
  humans.map(({ coords, panic, passedExits }) => ({
    coords,
    panic,
    passed_exits: passedExits,
  }));
