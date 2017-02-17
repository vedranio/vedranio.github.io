/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';
import { colors, screens, fontWeight, fontSize, dimensions } from '../../constants';

injectGlobal`
  html {
    overflow-x: hidden;
  }

  body {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    overflow-x: hidden;
    position: relative;
    font-size: ${fontSize.base};
    line-height: 1.5em;
    font-weight: ${fontWeight.thin};
    margin: 0px;
  }

  div {
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Mono', sans-serif;
    font-size: inherit;
    font-weight: ${fontWeight.medium};
  }

  p {
    margin-top: 0;
    max-width: ${dimensions.max_text_width};
    font-weight: ${fontWeight.thin};
  }

  .activeNavLink {
    font-weight: ${fontWeight.bold};
    color: ${colors.almostBlack};
  }

  .inactiveNavLink {
    color: ${colors.almostBlack};
    text-decoration: none;
  }
`;
