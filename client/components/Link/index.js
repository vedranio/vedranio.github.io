import styled from 'styled-components';
import { colors } from '../../constants';

const Link = styled.a`
  text-decoration: ${props => props.darkBg ? 'underline' : 'none'};
  margin-bottom: 0.75em;
  line-height: 1.5em;
  display: inline;
  color: ${props => props.darkBg ? colors.linkBlue : colors.linkBlue};

  &:hover {
    text-decoration: underline;
    opacity: ${props => props.darkBg ? 0.8 : 1};
    cursor: pointer;
  }
`;

export default Link;
