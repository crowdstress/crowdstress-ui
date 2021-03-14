import { createSelector } from 'reselect';

import { Editor } from '@/models/editor';
import { RootSelector } from '@/models/store';
import { createEqualSelector } from '@/store/createEqualSelector';

// Common
export const getEditor: RootSelector<Editor> = state => state.editor;

// Params
export const getParams = createEqualSelector(getEditor, result => result.params);
export const getSnapToGrid = createSelector(getParams, result => result.snapToGrid);
export const getSnapToNodes = createSelector(getParams, result => result.snapToNodes);
export const getIsLocked = createSelector(getParams, result => result.isLocked);
export const getDrawing = createSelector(getParams, result => result.drawing);
export const getGridSize = createSelector(getParams, result => result.gridSize);
export const getLayerSize = createSelector(getParams, result => result.layerSize);

// Rooms
export const getRooms = createEqualSelector(getEditor, result => result.rooms);

// Tool
export const getTool = createSelector(getEditor, result => result.tool);
