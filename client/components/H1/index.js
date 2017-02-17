import styled from 'styled-components';
import { dimensions } from '../../constants';

const H1 = styled.h1`
  font-size: 2em;
  margin-top: 0;
  line-height: 1.5em;
  max-width: ${dimensions.max_text_width};
`;

export default H1;
