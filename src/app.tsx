import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ScaleApp from './scale/ScaleApp'

const App = () => {
  const theme = createTheme({palette: {mode: 'light'}});
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ScaleApp />
      </ThemeProvider>
    </>
  )
}

export default App;