import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Catalog from './Catalog';
import MainPage from './MainPage';
import NotFoundPage from './404'

import {useEffect, useState} from "react";



const theme = createTheme({
  palette: {
    primary: {
      main: '#f59042',
    },
    secondary: {
      main: '#edf2ff',
    },
    background: {
      default: "#e4f0e2"
    }
  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>   
    <CssBaseline />
    <Router>
      <Routes>
          <Route  path="/" element={<MainPage/>} />
          <Route  path="/catalog" element={<Catalog/>} />
          <Route  path="/404" element={<NotFoundPage/>} />
      </Routes>
  </Router>
  </ThemeProvider>

  );
}

export default App;
