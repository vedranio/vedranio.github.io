import React from 'react';
import styled from 'styled-components';
import { screens } from '../../constants';
import Link from '../Link';

const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 0.75em;
  line-height: 1.5em;
  display: block;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }

  @media screen and (min-width: ${screens.medium}) {
    display: inline;
    padding-right: 2em;
  }
`;

export default FooterLink;
