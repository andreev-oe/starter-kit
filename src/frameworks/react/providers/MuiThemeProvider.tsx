import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { reactTheme } from '../theme/react-theme';

type MuiThemeProviderProperties = {
  children: ReactNode;
};

/** Подключает Material UI тему для React-части приложения. */
export default function MuiThemeProvider({ children }: MuiThemeProviderProperties) {
  return (
    <ThemeProvider theme={reactTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
