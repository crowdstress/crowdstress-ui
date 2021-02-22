import { RustHuman } from '@/models/human';
import { Exit } from '@/models/exit';
import { Section } from '@/models/section';
import { Room } from '@/models/room';

export interface App {
  started: boolean;
  humans: RustHuman[],
  rooms: Room[],
  walls: Section[],
  exits: Exit[],
}
