import * as React from 'react';
import '@/styles/layer.scss';
import { useEffect, useRef } from 'react';
import { getClassName } from '@/utils/getClassName';
import { LayerProps } from '@/models/layer';

type ReactLayerEvent = React.MouseEvent<HTMLDivElement>;

export const Layer: React.FC<LayerProps> =
  ({
    top,
    onMount,
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

    useEffect(() => {
      if (!layer.current || !onMount) return;

      onMount({
        width: layer.current.offsetWidth,
        height: layer.current.offsetHeight,
      });
    }, []);

    return <div
      ref={layer}
      className={getClassName('layer', top ? 'layer_top' : '')}
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
