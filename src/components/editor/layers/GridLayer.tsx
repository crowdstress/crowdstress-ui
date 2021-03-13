import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const tiles = [
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQiIGhlaWdodD0iODQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4NCIgaGVpZ2h0PSI4NCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIxIEwgODQgMjEgTSAyMSAwIEwgMjEgODQgTSAwIDQyIEwgODQgNDIgTSA0MiAwIEwgNDIgODQgTSAwIDYzIEwgODQgNjMgTSA2MyAwIEwgNjMgODQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDg0IDAgTCAwIDAgMCA4NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=',
];

interface GridProps {
  scale: number;
}

const Grid = styled.div<GridProps>`
  background-image: url(${({ scale }): string => tiles[scale]});
  background-position: -1px -1px;
  overflow: hidden;
`;

export const GridLayer: React.FC = () => {
  const [scale] = useState(0);

  return <Grid className="layer" scale={scale} />;
};
