import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ToneApp from './tone/ToneApp.tsx'
import ScaleApp from './scale/scale_app.tsx'
import NewScaleApp from './scale/NewScaleApp.tsx'

const App = () => {
  const theme = createTheme({palette: {mode: 'light'}});
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ToneApp />
        <ScaleApp />
        <NewScaleApp />
      </ThemeProvider>
    </>
  )
}

export default App;