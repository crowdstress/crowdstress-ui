import React from 'react';
import styled from 'styled-components';

import { flxCol } from '@/components/ui/flex';
import { Navbar } from '@/components/ui/Navbar';

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${flxCol};
`;

const LayoutInner = styled.div`
  flex: 1;
  background: #fafafc;
  ${flxCol};
`;

export const LayoutContent = styled.div`
  flex: 1;
  ${flxCol};
`;

export const Layout: React.FC = ({ children }) => {
  return <LayoutContainer>
    <LayoutInner>
      <Navbar />
      <LayoutContent>{ children }</LayoutContent>
    </LayoutInner>
  </LayoutContainer>;
};
