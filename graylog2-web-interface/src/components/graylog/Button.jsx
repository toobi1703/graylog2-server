import React from 'react';
import { withTheme } from 'styled-components';

const Button = React.memo(({ theme, ...restProps }) => {
  return <theme.components.Button {...restProps} />;
});

export default withTheme(Button);
