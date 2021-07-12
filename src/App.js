import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

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
      <Routes />
    </ThemeProvider>
  )
}
