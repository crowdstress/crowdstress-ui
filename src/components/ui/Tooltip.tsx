import React, { useState } from 'react';
import styled from 'styled-components';

import { GRAY_50, WHITE_COLOR } from '@/components/ui/colors';
import { fontPrimaryRegular } from '@/components/ui/fonts';

const MARKER_SIZE = '.5rem';
const MARKER_GAP = '.375rem';
const BACKGROUND = 'rgba(20, 20, 30, .85)';

export type Position = 'top' | 'bottom' | 'left' | 'right';
interface TooltipBoxProps {
  isVisible: boolean;
  position: Position;
}

const TooltipContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

type PositionValue = string | number;
type BlockPosition = Record<Position, PositionValue>;
interface Block {
  position: BlockPosition;
  transform: string;
}
type BeforeBlock = Block & {
  borderColor: string;
  borderWidth: string;
}
const tooltipBox = (pos: Position): Block => {
  const boxTop = (): PositionValue => {
    if (pos === 'top') return 0;
    if (pos === 'left' || pos === 'right') return '50%';
    return 'auto';
  };

  const boxBottom = (): PositionValue => {
    if (pos === 'bottom') return 0;
    return 'auto';
  };

  const boxLeft = (): PositionValue => {
    if (pos === 'top' || pos === 'bottom') return '50%';
    if (pos === 'left') return 0;
    return 'auto';
  };

  const boxRight = (): PositionValue => {
    if (pos === 'right') return 0;
    return 'auto';
  };

  const boxTransform = (): string => {
    if (pos === 'top') return `translateX(-50%) translateY(calc(-100% - ${MARKER_SIZE} - ${MARKER_GAP}))`;
    if (pos === 'bottom') return `translateX(-50%) translateY(calc(100% + ${MARKER_SIZE} + ${MARKER_GAP}))`;
    if (pos === 'left') return `translateX(calc(-100% - ${MARKER_SIZE} - ${MARKER_GAP})) translateY(-50%)`;
    if (pos === 'right') return `translateX(calc(100% + ${MARKER_SIZE} + ${MARKER_GAP})) translateY(-50%)`;
    return 'none';
  };

  const position: BlockPosition = {
    bottom: boxBottom(),
    left: boxLeft(),
    right: boxRight(),
    top: boxTop(),
  };

  const transform = boxTransform();

  return {
    position,
    transform,
  };
};
const before = (pos: Position): BeforeBlock => {
  const boxTop = (): PositionValue => {
    if (pos === 'left' || pos === 'right') return '50%';
    if (pos === 'bottom') return 0;
    return 'auto';
  };

  const boxBottom = (): PositionValue => {
    if (pos === 'top') return 0;
    return 'auto';
  };

  const boxLeft = (): PositionValue => {
    if (pos === 'top' || pos === 'bottom') return '50%';
    if (pos === 'right') return 0;
    return 'auto';
  };

  const boxRight = (): PositionValue => {
    if (pos === 'left') return 0;
    return 'auto';
  };

  const boxTransform = (): string => {
    if (pos === 'top') return 'translateX(-50%) translateY(100%)';
    if (pos === 'bottom') return 'translateX(-50%) translateY(-100%)';
    if (pos === 'left') return 'translateX(100%) translateY(-50%)';
    if (pos === 'right') return 'translateX(-100%) translateY(-50%)';
    return 'none';
  };

  const boxBorderWidth = (): string => {
    if (pos === 'top' || pos === 'bottom') return `${MARKER_SIZE} calc(${MARKER_SIZE} * .75)`;
    if (pos === 'left' || pos === 'right') return `calc(${MARKER_SIZE} * .75) ${MARKER_SIZE}`;
    return MARKER_SIZE;
  };

  const boxBorderColor = (): string => {
    if (pos === 'top') return `${BACKGROUND} transparent transparent transparent`;
    if (pos === 'bottom') return `transparent transparent ${BACKGROUND} transparent`;
    if (pos === 'left') return `transparent transparent transparent ${BACKGROUND}`;
    if (pos === 'right') return `transparent ${BACKGROUND} transparent transparent`;
    return 'transparent';
  };

  const position: BlockPosition = {
    bottom: boxBottom(),
    left: boxLeft(),
    right: boxRight(),
    top: boxTop(),
  };

  const transform = boxTransform();

  const borderWidth = boxBorderWidth();

  const borderColor = boxBorderColor();

  return {
    borderColor,
    borderWidth,
    position,
    transform,
  };
};

const TooltipBox = styled.div<TooltipBoxProps>`
  position: absolute;
  padding: .5rem .75rem;
  border-radius: .5rem;
  top: ${({ position }): PositionValue => tooltipBox(position).position.top};
  bottom: ${({ position }): PositionValue => tooltipBox(position).position.bottom};
  left: ${({ position }): PositionValue => tooltipBox(position).position.left};
  right: ${({ position }): PositionValue => tooltipBox(position).position.right};
  transform: ${({ position }): string => tooltipBox(position).transform};
  visibility: ${({ isVisible }): string => isVisible ? 'visible' : 'hidden'};
  opacity: ${({ isVisible }): number => isVisible ? 1 : 0};
  background: ${BACKGROUND};
  color: ${WHITE_COLOR};
  transition: opacity .15s ease-in-out;
  user-select: none;
  ${fontPrimaryRegular(12)};
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: ${({ position }): PositionValue => before(position).position.top};
    bottom: ${({ position }): PositionValue => before(position).position.bottom};
    left: ${({ position }): PositionValue => before(position).position.left};
    right: ${({ position }): PositionValue => before(position).position.right};
    transform: ${({ position }): string => before(position).transform};
    width: 0;
    height: 0;
    border-width: ${({ position }): string => before(position).borderWidth};
    border-color: ${({ position }): string => before(position).borderColor};
    border-style: solid;
  };
`;

interface TooltipProps {
  position: Position;
  text: JSX.Element | string;
}

export const Tooltip: React.FC<TooltipProps> = ({ position, text, children }) => {
  const [isVisible, setVisibility] = useState(false);

  const handleMouseOver = (): void => {
    if (!isVisible) setVisibility(true);
  };

  const handleMouseOut = (): void => {
    if (isVisible) setVisibility(false);
  };

  return <TooltipContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
    { children }
    <TooltipBox position={position} isVisible={isVisible}>{ text }</TooltipBox>
  </TooltipContainer>;
};

const OneLineTooltipText = styled.span`
  white-space: nowrap;
`;

const ShortcutText = styled.span`
  margin-left: .625rem;
  color: ${GRAY_50};
`;

export const oneLineTooltipText = (text: string): JSX.Element => <OneLineTooltipText>{ text }</OneLineTooltipText>;
export const tooltipTextWithShortcut = (text: string, shortcut: string): JSX.Element =>
  <OneLineTooltipText>
    { text }
    <ShortcutText>
      { shortcut }
    </ShortcutText>
  </OneLineTooltipText>;

