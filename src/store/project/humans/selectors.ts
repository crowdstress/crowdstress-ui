import { RootSelector } from '@/models/store';
import { Human } from '@/models/human';
import { createEqualSelector } from '@/store/createEqualSelector';

const humans: RootSelector<Human[]> = state => state.project.data.humans;
export const getHumans = createEqualSelector(humans, result => result);
