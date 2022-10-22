import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AppContextProvider } from './context/AppContext'
import Routes from './routes'

export default function App() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#FB4934',
      },
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </ThemeProvider>
  )
}
