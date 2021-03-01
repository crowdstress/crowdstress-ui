import styled from 'styled-components';
import { WHITE_COLOR } from '@/components/ui/colors';
import React from 'react';

type Margin = 'right' | 'bottom';
interface BarButtonProps {
  active?: boolean;
  margin: Margin;
}

export const BarButton = styled.button<BarButtonProps>`
  padding: .75rem;
  background: ${({ active }): string => active ? '#f0f0ff' : 'transparent'};
  transition: background .15s ease-in-out;
  border-radius: .2rem;
  &:hover {
    background: #f0f0ff;
  }
  &:disabled {
    pointer-events: none;
    opacity: .25;
  }
  &:not(:last-child) {
    margin-right: ${({ margin }): string => margin === 'right' ? '.5rem' : '0'};
    margin-bottom: ${({ margin }): string => margin === 'bottom' ? '.5rem' : '0'};
  }
`;

type Direction = 'row' | 'column';
interface BarProps {
  direction?: Direction;
}

export const Bar = styled.div<BarProps>`
  display: flex;
  background: ${WHITE_COLOR};
  justify-content: space-between;
  flex-direction: ${({ direction }): Direction => direction ?? 'row'};
  width: 100%;
  padding: ${({ direction }): string => direction === 'column' ? '.5rem 0' : '0 .5rem'};
`;

interface BarItemProps {
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  margin?: Margin;
}

export const BarItem: React.FC<BarItemProps> =
  ({ disabled, onClick, active, margin = 'right', children }) =>
    <BarButton onClick={onClick} disabled={disabled} active={active} margin={margin}>
      <div className="icon-wrapper-m">
        {children}
      </div>
    </BarButton>;
