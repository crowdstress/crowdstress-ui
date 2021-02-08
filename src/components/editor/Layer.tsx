import * as React from 'react';
import '@/styles/layer.scss';
import { useRef } from 'react';
import { LayerProps } from '@/components/editor/props';

type ReactLayerEvent = React.MouseEvent<HTMLDivElement>;

export const Layer: React.FC<LayerProps> =
  ({
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onRightClick,
    children,
  }) => {
    const layer = useRef<HTMLDivElement>(null);

    const handleMouseMove = ({ clientX, clientY }: ReactLayerEvent): void => {
      if (!layer.current || !onMouseMove) return;

      const { left, top } = layer.current.getBoundingClientRect();
      onMouseMove({
        x: clientX - left,
        y: clientY - top,
      });
    };

    const handleMouseDown = ({ clientX, clientY, button }: ReactLayerEvent): void => {
      if (!layer.current || !onMouseDown || button !== 0) return;

      const { left, top } = layer.current.getBoundingClientRect();
      onMouseDown({
        x: clientX - left,
        y: clientY - top,
      });
    };

    const handleMouseUp = ({ clientX, clientY }: ReactLayerEvent): void => {
      if (!layer.current || !onMouseUp) return;

      const { left, top } = layer.current.getBoundingClientRect();
      onMouseUp({
        x: clientX - left,
        y: clientY - top,
      });
    };

    const handleRightClick = (e: ReactLayerEvent): void => {
      e.preventDefault();
      if (!layer.current || !onRightClick) return;

      const { clientX, clientY } = e;
      const { left, top } = layer.current.getBoundingClientRect();
      onRightClick({
        x: clientX - left,
        y: clientY - top,
      });
    };

    return <div
      ref={layer}
      className="layer"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleRightClick}
    >
      <svg className="layer__svg">
        {children}
      </svg>
    </div>;
  };
