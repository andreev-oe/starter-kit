import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { useAppThemeStore } from '../store/app-theme.store';
import { createReactTheme } from '../theme/react-theme';

type MuiThemeProviderProperties = {
  children: ReactNode;
};

/** Подключает Material UI тему для React-части приложения. */
export default function MuiThemeProvider({ children }: MuiThemeProviderProperties) {
  const themeMode = useAppThemeStore((state) => state.themeMode);
  const reactTheme = useMemo(() => {
    return createReactTheme(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={reactTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
