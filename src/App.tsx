import React from 'react';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';

import { Main } from './components/Main';
import { Header } from './components/Header';


export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  }
});

function App() {

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
  );

  const theme = React.useMemo(
      () =>
          createTheme({
            palette: {
              mode,
            },
          }),
      [mode],
  );

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Header/>
          <Main/>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
