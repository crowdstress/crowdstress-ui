import styled from 'styled-components';
import { BLACK_COLOR, DISABLED_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import { darken } from '@/utils/darken';

type ButtonStyle = 'primary' | 'secondary' | 'light'
type ButtonDisplay = 'block' | 'inline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  readonly buttonStyle: ButtonStyle;
  readonly buttonDisplay: ButtonDisplay;
  readonly size: ButtonSize;
}

export const Button = styled.button<ButtonProps>`
  display: ${({ buttonDisplay }): string => buttonDisplay === 'block' ? 'block' : 'inline-block'};
  width: ${({ buttonDisplay }): string => buttonDisplay === 'block' ?'100%' : 'auto' };
  padding: ${({ size }): string => {
    if (size === 'large') return '1rem 2rem';
    if (size === 'medium') return '.875rem 1.5rem';
    return '.5rem 1rem';
  }};
  font-size: ${({ size }): string => {
    if (size === 'large') return '1.25rem';
    if (size === 'medium') return '1.125rem';
    return '1rem';
  }};
  border-radius: ${({ size }): string => {
    if (size === 'large') return '1rem';
    return '.5rem';
  }};
  cursor: pointer;
  color: ${({ buttonStyle }): string => {
    if (buttonStyle === 'primary') return WHITE_COLOR;
    return BLACK_COLOR;
  }};
  background: ${({ buttonStyle }): string => {
    if (buttonStyle === 'primary') return PRIMARY_COLOR;
    return 'transparent';
  }};
  &:hover {
    background: ${({ buttonStyle }): string => buttonStyle === 'primary' ? darken(PRIMARY_COLOR, 10) : 'transparent'}
  };
  transition: background .15s ease-in-out;
  font-weight: 400;
  &:disabled {
    pointer-events: none;
    background: ${DISABLED_COLOR};
  }
`;
