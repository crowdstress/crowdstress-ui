import React from 'react';
import styled from 'styled-components';

import { Navbar } from '@/components/ui/Navbar';

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const LayoutInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fafafc;
  min-height: 0;
`;

export const LayoutContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const Layout: React.FC = ({ children }) => {
  return <LayoutContainer>
    <LayoutInner>
      <Navbar />
      <LayoutContent>{ children }</LayoutContent>
    </LayoutInner>
  </LayoutContainer>;
};
