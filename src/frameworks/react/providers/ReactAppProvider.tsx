import type { ReactNode } from 'react';

import MuiThemeProvider from './MuiThemeProvider';
import ReactQueryProvider from './ReactQueryProvider';

type ReactAppProviderProperties = {
  children: ReactNode;
};

/** Подключает общие providers для React-части приложения. */
export default function ReactAppProvider({ children }: ReactAppProviderProperties) {
  return (
    <MuiThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </MuiThemeProvider>
  );
}
