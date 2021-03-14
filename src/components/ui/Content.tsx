import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  animation: ${slideUp} .5s ease-in-out;
`;
