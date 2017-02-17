import React from 'react';
// import Link from 'react-router/Link';
import styled from 'styled-components';
import { padding, margins, dimensions, colors, screens } from '../../constants';
import headshot_large from '../../assets/headshot_large.png';
// hs = require("./headshot.png")

const Container = styled.section`
  background-color: ${colors.mediumGray};

  max-width: 100%;

  // Medium devices
  @media screen and (min-width: ${screens.medium}) and (max-width: ${screens.large}) {
    max-width: ${screens.medium};
    margin: auto;
  }

  // Large devices
  @media screen and (min-width: ${screens.large}) {
    max-width: ${screens.large};
    margin: auto;
  }
`;

const HeaderImage= styled.div`
  background-image: url('../../assets/headshot.png');
  background-repeat: no-repeat;
  background-position: left bottom;
  padding-top: calc(150px + (20 * ${padding.section_top})); //image height + standard section padding
  margin-left: ${margins.left};

  // Medium devices
  @media screen and (min-width: ${screens.medium}) and (max-width: ${screens.large}) {
    background-image: url('../../assets/headshot_large.png');
    padding-top: calc(${dimensions.block_width} + (20 * ${padding.section_top})); //image height + standard section padding
    display: inline-block;
    width: 300px;
    background-size: contain;
    margin-left: 0;
  }

  // Large screen
  @media screen and (min-width: ${screens.large}) {
    background-image: url(${headshot_large});
    padding-top: calc(${dimensions.block_width} + (20 * ${padding.section_top})); //image height + standard section padding
    display: inline-block;
    width: ${dimensions.block_width};
    margin-left: 0;
  }
`;

function HomeHeader () {
  return (
    <Container>
      <HeaderImage />
    </Container>
  );
}

export default HomeHeader;
