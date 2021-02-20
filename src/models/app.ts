import { RustHuman } from '@/models/human';
import { Exit } from '@/models/exit';
import { Section } from '@/models/section';

export interface App {
  started: boolean;
  humans: RustHuman[],
  walls: Section[],
  exits: Exit[],
}
