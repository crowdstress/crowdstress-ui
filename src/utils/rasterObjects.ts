import { DrawingObject } from '@/models/drawingObject';
import { BACKGROUND_COLOR, EXIT_COLOR, OBJECT_COLOR } from '@/config';

export const rasterObjects = (objects: DrawingObject[], width: number, height: number): string | null => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.setAttribute('width', width.toString());
  canvas.setAttribute('height', height.toString());

  if (!ctx) {
    return null;
  }

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.lineWidth = 2;

  ctx.fillRect(0, 0, width, height);

  objects.forEach(object => {
    const { type, state, points } = object;
    if (state === 'in-progress') return;

    ctx.beginPath();
    ctx.strokeStyle = type === 'separator' ? EXIT_COLOR : OBJECT_COLOR;

    if (type === 'line' || type === 'separator') {
      const [point1, point2] = points;
      ctx.moveTo(...point1);
      ctx.lineTo(...point2);
    }

    if (type === 'rect') {
      const [point1, point2] = points;
      const rectWidth = Math.abs(point2[0] - point1[0]);
      const rectHeight = Math.abs(point2[1] - point1[1]);
      ctx.strokeRect(point1[0], point1[1], rectWidth, rectHeight);
    }

    ctx.stroke();
    ctx.closePath();
  });

  return canvas.toDataURL('image/png');
};
