import { LayerSize } from '@/models/layer';

export const DEFAULT_GRID_SIZE = 21;
export const DEFAULT_CROSS_SIZE = 16;
export const DEFAULT_LAYER_SIZE: LayerSize = {
  width: 0,
  height: 0,
};

export const DRAWING_OBJECT_ID = 'drawing-object';

export const HUMAN_SIZE = 10;
export const DEFAULT_HUMAN_DISTANCE = 0;
export const HUMAN_PANIC_HSL = {
  H: 120,
  S: '100%',
  L: '45%',
};

export const BACKGROUND_COLOR = '#000000';
export const OBJECT_COLOR = '#FFFFFF';
export const EXIT_COLOR = '#FF0000';

export const OPENCV_APPROXIMATE_EPS = 10;

export const HTTP_URL = 'http://127.0.0.1';
