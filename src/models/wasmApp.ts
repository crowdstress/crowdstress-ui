import { Exit } from '@/models/exit';
import { RustHuman } from '@/models/human';
import { Room } from '@/models/room';
import { Section } from '@/models/section';

export interface WasmApp {
  exits: Exit[],
  humans: RustHuman[],
  rooms: Room[],
  started: boolean;
  walls: Section[];
}
