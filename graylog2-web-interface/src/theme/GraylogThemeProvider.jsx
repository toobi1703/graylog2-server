import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { breakpoints, colors, fonts, utils } from 'theme';
import buttonGenerator from 'components/graylog/styles/buttonGenerator';

/* NOTE: mode will eventually need to come from User Preferences */
const THEME_MODE = 'teinte';

const Button = buttonGenerator(colors);

const GraylogThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={{
      mode: THEME_MODE,
      breakpoints,
      colors,
      fonts,
      components: {
        Button,
      },
      utils,
    }}>
      {children}
    </ThemeProvider>
  );
};

GraylogThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default GraylogThemeProvider;
