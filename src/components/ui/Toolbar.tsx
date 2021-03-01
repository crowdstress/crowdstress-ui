import styled from 'styled-components';
import { BORDER_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import React from 'react';

const MARGIN = '1rem' as const;
const GAP = '.75rem' as const;

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right';
interface Position {
  vertical: VerticalPosition;
  horizontal: HorizontalPosition;
}
type Direction = 'row' | 'column';
interface ToolbarProps {
  position: Position;
  direction: Direction;
}

export const Toolbar = styled.div<ToolbarProps>`
  position: absolute;
  top: ${({ position }): string => {
    const { vertical } = position;
    return vertical === 'top' ? MARGIN : 'auto';
  }};
  bottom: ${({ position }): string => {
    const { vertical } = position;
    return vertical === 'bottom' ? MARGIN : 'auto';
  }};
  left: ${({ position }): string => {
    const { horizontal } = position;
    return horizontal === 'left' ? MARGIN : 'auto';
  }};
  right: ${({ position }): string => {
    const { horizontal } = position;
    return horizontal === 'right' ? MARGIN : 'auto';
  }};
  display: flex;
  flex-direction: ${({ direction }): Direction => direction};
`;

type Margin = 'right' | 'bottom';
interface ToolbarItemProps {
  active?: boolean;
  margin: Margin;
}

const ToolbarItem = styled.button<ToolbarItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: ${WHITE_COLOR};
  border: 2px solid ${({ active }): string => active ? PRIMARY_COLOR : BORDER_COLOR};
  border-radius: .5rem;
  z-index: 9;
  &:disabled {
    pointer-events: none;
  }
  &:not(:last-child) {
    margin-right: ${({ margin }): string | number => margin === 'right' ? GAP : 0};
    margin-bottom: ${({ margin }): string | number => margin === 'bottom' ? GAP : 0};
  }
`;

interface ToolbarItemIconProps {
  disabled?: boolean;
}

const ToolbarItemIcon = styled.div<ToolbarItemIconProps>`
  opacity: ${({ disabled }): number => disabled ? .5 : 1};
`;

type ToolbarButtonProps = ToolbarItemProps & { disabled?: boolean; onClick: () => void; };

export const ToolbarButton: React.FC<ToolbarButtonProps> =
  ({ active, margin, disabled, onClick, children }) => {
    return <ToolbarItem
      active={active}
      margin={margin}
      onClick={onClick}
      disabled={disabled}
    >
      <ToolbarItemIcon disabled={disabled} className="icon-wrapper-m">
        { children }
      </ToolbarItemIcon>
    </ToolbarItem>;
  };
