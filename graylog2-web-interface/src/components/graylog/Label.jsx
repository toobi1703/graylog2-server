import styled, { css } from 'styled-components';
// eslint-disable-next-line no-restricted-imports
import { Label as BootstrapLabel } from 'react-bootstrap';

const Label = styled(BootstrapLabel)(({ bsStyle = 'default', theme }) => {
  const backgroundColor = theme.colors.variant[bsStyle];
  const textColor = theme.utils.readableColor(backgroundColor);

  return css`
    background-color: ${backgroundColor};
    color: ${textColor};
  `;
});

export default Label;
