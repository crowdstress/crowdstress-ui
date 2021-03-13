import styled from 'styled-components';

import { BORDER_COLOR, PRIMARY_COLOR } from '@/components/ui/colors';
import { fontPrimaryLight } from '@/components/ui/fonts';

export const Input = styled.input`
  display: block;
  width: 100%;
  background: #fafafc;
  padding: .75rem 1.5rem;
  border-radius: .5rem;
  border: 1px solid ${BORDER_COLOR};
  transition: border-color .15s ease-in-out, background .15s ease-in-out;
  ${fontPrimaryLight(16)};
  &:focus {
    background: transparent;
    border-color: ${PRIMARY_COLOR};
  }
  &::placeholder {
    ${fontPrimaryLight(16)};
  }
  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`;
