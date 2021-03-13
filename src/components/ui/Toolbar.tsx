import React from 'react';
import styled from 'styled-components';

import { BORDER_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import { flxAicJcc } from '@/components/ui/flex';
import { Position, Tooltip } from '@/components/ui/Tooltip';

const MARGIN = '1rem' as const;
const GAP = '.75rem' as const;

export const getToolbarButtonMargin = (direction: ToolbarDirection): ToolbarMargin => direction === 'row' ? 'right' : 'bottom';

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right';
interface ToolbarPosition {
  horizontal: HorizontalPosition;
  vertical: VerticalPosition;
}
export type ToolbarDirection = 'row' | 'column';
interface ToolbarProps {
  direction: ToolbarDirection;
  position: ToolbarPosition;
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
  flex-direction: ${({ direction }): ToolbarDirection => direction};
  z-index: 9;
`;

export type ToolbarMargin = 'right' | 'bottom';
interface MarginProps {
  margin: ToolbarMargin;
}

const ToolbarItem = styled.button<MarginProps>`
  border-radius: .5rem;
  background: ${WHITE_COLOR};
  ${flxAicJcc};
  &:disabled {
    pointer-events: none;
  }
  &:not(:last-child) {
    margin-right: ${({ margin }): string | number => margin === 'right' ? GAP : 0};
    margin-bottom: ${({ margin }): string | number => margin === 'bottom' ? GAP : 0};
  }
`;

interface ActiveDisabledProps {
  active?: boolean;
  disabled?: boolean;
}

const ToolbarItemIcon = styled.div<ActiveDisabledProps>`
  width: 3rem;
  height: 3rem;
  opacity: ${({ disabled }): number => disabled ? .5 : 1};
  border: 2px solid ${({ active }): string => active ? PRIMARY_COLOR : BORDER_COLOR};
  border-radius: .5rem;
  ${flxAicJcc};
`;

type ToolbarButtonProps = MarginProps & {
  disabled?: boolean;
  onClick?: () => void;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ margin, disabled, onClick, children }) => {
  return <ToolbarItem
    margin={margin}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </ToolbarItem>;
};

interface ToolbarContentProps {
  active?: boolean;
  disabled?: boolean;
}

export const ToolbarContent: React.FC<ToolbarContentProps> = ({ active, disabled, children }) => {
  return <ToolbarItemIcon active={active} disabled={disabled}>
    <div className="icon-wrapper-m">
      { children }
    </div>
  </ToolbarItemIcon>;
};

type ToolbarButtonWithTooltipProps = MarginProps & {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  text: JSX.Element | string;
  tooltipPosition: Position;
}

export const ToolbarButtonWithTooltip: React.FC<ToolbarButtonWithTooltipProps> = ({ margin, tooltipPosition, active, disabled, onClick, text, children }) =>
  <ToolbarButton margin={margin} disabled={disabled} onClick={onClick}>
    <Tooltip position={tooltipPosition} text={text}>
      <ToolbarContent active={active} disabled={disabled}>
        { children }
      </ToolbarContent>
    </Tooltip>
  </ToolbarButton>;
