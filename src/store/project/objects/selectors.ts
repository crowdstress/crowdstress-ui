import { RootSelector } from '@/models/store';
import { Undoable } from '@/models/undoable';
import { DrawingObject } from '@/models/drawingObject';
import { createEqualSelector } from '@/store/createEqualSelector';
import { createSelector } from 'reselect';

const objects: RootSelector<Undoable<DrawingObject[]>> = state => state.project.data.objects;
export const getPresentObjects = createEqualSelector(objects, result => result?.present);
export const getPastObjects = createEqualSelector(objects, result => result?.past);
export const getFutureObjects = createEqualSelector(objects, result => result.future);
export const getResetAbility = createSelector(getPresentObjects, result => result.length > 0);
export const getUndoAbility = createSelector(getPastObjects, result => result.length > 0);
export const getRedoAbility = createSelector(getFutureObjects, result => result.length > 0);
export const getRunAbility = createSelector(getPresentObjects, result => result?.length > 0);
