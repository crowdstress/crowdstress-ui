import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';
import { Section } from '@/models/section';

export interface Human {
  coords: DrawingObjectPoint;
  panic: number;
  passedExits: DrawingObjectID[];
  targetSection: Section | null;
}

export type RustHuman = Omit<Human, 'targetSection' | 'passedExits'> & { passed_exits: DrawingObjectID[]; target_section: Section | null };

export const convertHumansToRust = (humans: Human[]): RustHuman[] =>
  humans.map(({ coords, panic, targetSection, passedExits }) => ({
    coords,
    panic,
    passed_exits: passedExits,
    target_section: targetSection,
  }));
