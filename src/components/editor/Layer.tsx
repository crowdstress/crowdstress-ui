import * as React from 'react';
import '@/styles/layer.scss';

interface LayerProps {
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Layer: React.FC<LayerProps> =
  ({ onMouseMove, onMouseDown, onMouseUp, children }) =>
    <div className="layer" onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <svg className="layer__svg">
        {children}
      </svg>
    </div>;
