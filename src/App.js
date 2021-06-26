import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Routes from './components/Routes'

export default function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
