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
import DatasetPage from './DatasetPage'
import JoinPage from './JoinPage'
import About from './About'
import LogIn from './LogIn'
import SignUp from './SignUp'
import DataSources from './DataSources'
import Contribute from './Contribute'



const theme = createTheme({
  palette: {
    primary: {
      main: '#a141e0',
    },
    secondary: {
      main: '#edf2ff',
    },
    background: {
      default: "#f5e6ff"
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
          <Route  path="/catalog" element={<Catalog />} />
          <Route  path="/fonts/:sourceId" element={<DataSources />} />
          <Route  path="/about" element={<About />} />
          <Route  path="/login" element={<LogIn />} />
          <Route  path="/signup" element={<SignUp />} />
          <Route  path="/contribueix" element={<Contribute />} />
          <Route  path="/404" element={<NotFoundPage/>} />
          <Route path="/catalog/:datasetId" element={<DatasetPage/>} />
      </Routes>
  </Router>
  </ThemeProvider>

  );
}

export default App;
