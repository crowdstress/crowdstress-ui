import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { logOut } from '@/api/handlers/user';
import IconLogout from '@/assets/svg/logout.svg';
import { BLACK_COLOR, BORDER_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import { getUser } from '@/store/app/selectors';
import { setUser } from '@/store/app/user/actions';

const NavbarContainer = styled.nav`
  height: 4rem;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
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

const NavbarUserEmail = styled.div`
  margin-right: 1rem;
  font-weight: 300;
  font-size: 1rem;
`;

const LogoutButton = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  transition: background .15s ease-in-out;
  &:hover {
    background: #f6f6f6;
  }
`;

export const Navbar: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const logout = async (): Promise<void> => {
    const res = await logOut();
    if (res.status === 401) {
      dispatch(setUser(null));
    }
  };

  return <NavbarContainer>
    <Link to="/">
      <NavbarTitle>crowdstress<NavbarTitleBadge>α</NavbarTitleBadge></NavbarTitle>
    </Link>
    {
      user &&
    <div className="flx-aic">
      <NavbarUserEmail>{ user.email }</NavbarUserEmail>
      <LogoutButton onClick={logout}>
        <div className="icon-wrapper-m">
          <IconLogout />
        </div>
      </LogoutButton>
    </div>
    }
  </NavbarContainer>;
};
