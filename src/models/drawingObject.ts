export const drawingObjectTypes = ['line', 'rect', 'ellipse', 'qcurve'] as const;

export type DrawingObjectType = typeof drawingObjectTypes[number];
export type DrawingObjectPoint = readonly [number, number];
export type DrawingObjectState = 'in-progress' | 'done';
export interface DrawingObject {
  readonly id: string;
  readonly type: DrawingObjectType;
  readonly points: readonly DrawingObjectPoint[];
  readonly state: DrawingObjectState;
}
