import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  BLACK_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR
} from '@/components/ui/colors';

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
`;

const Navbar = styled.nav`
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${BORDER_COLOR};
  user-select: none;
  background: ${WHITE_COLOR};
  transition: background .25s ease-in-out, border .25s ease-in-out;
`;

const NavbarTitle = styled.div`
  position: relative;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: ${BLACK_COLOR};
  transition: color .25s ease-in-out;
  text-decoration: none;
`;

const NavbarTitleBadge = styled.sup`
  position: absolute;
  top: -.25rem;
  font-family: 'Poppins', sans-serif;
  color: ${PRIMARY_COLOR};
  transition: color .25s ease-in-out;
`;

export const LayoutContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Layout: React.FC = ({ children }) => {
  return <LayoutContainer>
    <LayoutInner>
      <Navbar>
        <Link to="/">
          <NavbarTitle>crowdstress<NavbarTitleBadge>α</NavbarTitleBadge></NavbarTitle>
        </Link>
      </Navbar>
      <LayoutContent>{ children }</LayoutContent>
    </LayoutInner>
  </LayoutContainer>;
};
