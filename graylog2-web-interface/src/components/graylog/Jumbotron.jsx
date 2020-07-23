import styled, { css } from 'styled-components';
// eslint-disable-next-line no-restricted-imports
import { Jumbotron as BootstrapJumbotron } from 'react-bootstrap';

export const Jumbotron = styled(BootstrapJumbotron)(({ theme }) => css`
  color: ${theme.colors.global.textDefault};
  background-color: ${theme.colors.global.contentBackground};
`);

export default Jumbotron;
