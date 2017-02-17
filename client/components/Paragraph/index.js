import styled from 'styled-components';
import { dimensions } from '../../constants';


const Paragraph = styled.p`

  max-width: ${props => props.narrow ? dimensions.block_width : dimensions.max_text_width};

`;

export default Paragraph;
