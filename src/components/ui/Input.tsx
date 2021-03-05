import styled from 'styled-components';

import { BORDER_COLOR, PRIMARY_COLOR } from '@/components/ui/colors';

export const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
  background: #fafafc;
  padding: .75rem 1.5rem;
  border-radius: .5rem;
  border: 1px solid ${BORDER_COLOR};
  transition: border-color .15s ease-in-out, background .15s ease-in-out;
  &:focus {
    background: transparent;
    border-color: ${PRIMARY_COLOR};
  }
  &::placeholder {
    font-weight: 300;
  }
  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`;
