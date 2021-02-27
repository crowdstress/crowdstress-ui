import styled from 'styled-components';
import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '@/components/ui/colors';

type InputDisplay = 'block' | 'inline';

interface InputProps {
  inputDisplay: InputDisplay;
}

export const Input = styled.input<InputProps>`
  display: ${({ inputDisplay }): string => inputDisplay === 'block' ? 'block' : 'inline-block'};
  width: ${({ inputDisplay }): string => inputDisplay === 'block' ?'100%' : 'auto' };;
  border: 1px solid ${BORDER_COLOR};
  border-radius: .5rem;
  padding: .5rem 1rem;
  font-size: 1rem;
  &:focus {
    border-color: ${PRIMARY_COLOR};
  };
  &:invalid {
    border-color: ${RED_COLOR};
  };
  transition: border-color .15s ease-in-out;
`;
