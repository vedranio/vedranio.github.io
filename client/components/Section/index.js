import styled from 'styled-components';
import { colors, screens, padding, margins, dimensions } from '../../constants';

// Provides the default padding and margins for standard sections
// Should be used by all sections throughout the site

const Section = styled.section`

  /* Adapt the colors based on colour prop */
  background: ${props => props.dark ? colors.almostBlack : colors.white};
  color: ${props => props.dark ? colors.white : colors.almostBlack};

  padding-top: ${props => props.first ? padding.section_first : padding.section_top};
  padding-bottom: ${props => props.last ? padding.section_last : padding.section_bottom};

  max-width: 100%;
  margin-left: ${margins.left};
  margin-right: ${margins.right};


  @media screen and (min-width: ${screens.large}) {

    padding-top: ${props => props.first ? padding.section_first_large : padding.section_top};
    padding-bottom: ${props => props.last ? padding.section_last_large : padding.section_bottom};

    max-width: ${screens.large};
    margin: auto;
  }
`;

export default Section;
