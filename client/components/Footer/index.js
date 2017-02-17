import React from 'react';
// import Link from 'react-router/Link';
import styled from 'styled-components';

import FooterLink from '../FooterLink';
import Section from '../Section';

import { colors, screens } from '../../constants';

const Container = styled.section`
  min-height: 10em;
  background-color: ${colors.almostBlack};

  @media screen and (min-width: ${screens.medium}) {
   padding-top: 4em;
 }
`;

function Footer () {
  return (
    <Container>
      <Section dark>
        <FooterLink target="_blank" href="https://twitter.com/vedranio">Twitter</FooterLink>
        <FooterLink target="_blank" href="https://medium.com/@vedranio">Medium</FooterLink>
        <FooterLink target="_blank" href="https://www.linkedin.com/in/vedran-arnautovic-716a1b128">LinkedIn</FooterLink>
        <FooterLink target="_blank" href="https://github.com/vedranio">GitHub</FooterLink>
        <FooterLink target="_blank" href="https://www.instagram.com/vedran_arnautovic/">Instagram</FooterLink>
        <FooterLink target="_blank" href="mailto:vedran.arnautovic@gmail.com">Email</FooterLink>
      </Section>
    </Container>
  );
}

export default Footer;
