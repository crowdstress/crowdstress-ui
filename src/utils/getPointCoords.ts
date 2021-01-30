import { DrawingObjectPoint } from '@/models/drawingObject';

interface GetPointCoordsArgs {
  snapToGrid: boolean;
  gridSize: number;
}

export const getPointCoords = (
  x: number,
  y: number,
  options?: GetPointCoordsArgs
): DrawingObjectPoint => {
  if (options && options.snapToGrid) {
    return [
      Math.round(x / options.gridSize) * options.gridSize,
      Math.round(y / options.gridSize) * options.gridSize,
    ];
  }

  return [x, y];
};
