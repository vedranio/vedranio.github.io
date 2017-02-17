import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fontWeight, margins, colors, screens } from '../../constants';

const Nav = styled.nav`
  background-color: ${colors.mediumGray};
  padding: 0.1em 0em 2em 0em;
  padding-bottom: ${props => props.extra_height ? '6em' : '2em'};


  @media screen and (min-width: ${screens.large}) {
    padding: 2em 2em 4em 2em;
    padding-bottom: ${props => props.extra_height ? '6em' : '4em'};
  }
`;

const NavList = styled.ul`
  padding: 0;
  list-style: none;
  margin-left: ${margins.left};

  @media screen and (min-width: ${screens.large}) {
    max-width: ${screens.large};
    margin: auto;
  }
`;

const NavItem = styled.li`
  padding: 1em 0.6em;
  display: inline;

  font-family: 'Roboto Mono', sans-serif;
  font-size: 1em;
  font-weight: ${fontWeight.normal};

  @media screen and (min-width: ${screens.large}) {
    padding: 1em 1em;
  }

  &:hover {
    text-decoration: underline;
  }

  &:first-child {
    padding-left: 0;
  }
`;


// .nav__item {
//   font-family: 'Roboto Mono', sans-serif;
//   font-size: 1em;
//   font-weight: @font-weight-normal;
//   display: inline;
//
// }

const Navigation = () => (
      <Nav>
        <NavList>
          <NavItem><Link to="/" className="inactiveNavLink" activeClassName="activeNavLink">Home</Link></NavItem>
          <NavItem><Link to="/about_vedran" className="inactiveNavLink" activeClassName="activeNavLink">About me</Link></NavItem>
          <NavItem><Link to="/vedrans_design_work" className="inactiveNavLink" activeClassName="activeNavLink">My Work</Link></NavItem>
        </NavList>
      </Nav>
);

export default Navigation;
