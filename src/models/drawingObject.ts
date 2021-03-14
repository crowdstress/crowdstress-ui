export const drawingObjectTypes = ['line', 'rect', 'ellipse', 'qcurve', 'separator'] as const;

export type DrawingObjectID = string;
export type DrawingObjectType = typeof drawingObjectTypes[number];
export interface DrawingObjectPoint {
  x: number;
  y: number;
}
export type DrawingObjectState = 'in-progress' | 'done';
export interface DrawingObject {
  id: DrawingObjectID;
  points: DrawingObjectPoint[];
  state: DrawingObjectState;
  type: DrawingObjectType;
}

export type RustDrawingObject = Omit<DrawingObject, 'type' | 'state'> & { object_type: number; };

export const convertObjectsToRust = (objects: DrawingObject[]): RustDrawingObject[] =>
  objects.map(({ id, points, type }) => ({
    id,
    object_type: drawingObjectTypes.indexOf(type),
    points,
  }));
