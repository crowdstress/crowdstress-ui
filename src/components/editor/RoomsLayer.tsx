import React from 'react';
import { useSelector } from 'react-redux';

import { Layer } from '@/components/editor/Layer';
import { getRooms } from '@/store/editor/selectors';
import { rgb2hex } from '@/utils/rgb2hex';

const randomHex = (): string => {
  const random = (): number => Math.floor(Math.random() * 255);
  return rgb2hex(random(), random(), random());
};

export const RoomsLayer: React.FC = () => {
  const rooms = useSelector(getRooms);

  return <Layer>
    {
      rooms.map(({ id, points }) =>
        <polygon
          key={`point-${id}`}
          points={points.map(({ x, y }) => `${x},${y}`).join(' ')} fill={randomHex()}
        />
      )
    }
  </Layer>;
};
