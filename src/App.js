import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { AppContextProvider } from './context/AppContext'
import Routes from './routes'

export default function App() {
  const darkTheme = createMuiTheme({
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
