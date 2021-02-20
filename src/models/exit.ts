import { DrawingObjectID } from '@/models/drawingObject';
import { Section } from '@/models/section';

export interface Exit {
  id: DrawingObjectID;
  section: Section;
}
