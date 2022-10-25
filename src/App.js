import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';

import { AppContextProvider } from './context/AppContext'
import Routes from './routes'

export default function App() {
  const darkTheme = createTheme(adaptV4Theme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FB4934',
      },
    },
  }))

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
