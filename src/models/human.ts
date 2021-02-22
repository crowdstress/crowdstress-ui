import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';
import { Section } from '@/models/section';

export interface Human {
  coords: DrawingObjectPoint;
  panic: number;
  targetSection: Section | null;
  passedExits: DrawingObjectID[];
}

export type RustHuman = Omit<Human, 'targetSection' | 'passedExits'> & { target_section: Section | null, passed_exits: DrawingObjectID[]; };

export const convertHumansToRust = (humans: Human[]): RustHuman[] =>
  humans.map(({ coords, panic, targetSection, passedExits }) => ({
    coords,
    panic,
    target_section: targetSection,
    passed_exits: passedExits,
  }));
