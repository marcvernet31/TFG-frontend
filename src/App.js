import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import About from './About';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Catalog from './Catalog';
import NotFoundPage from './404';
import MainPage from './MainPage';
import Contribute from './Contribute';
import DataSources from './DataSources';
import DatasetPage from './DatasetPage';



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
          <Route  path="/about" element={<About/>} />
          <Route  path="/login" element={<LogIn/>} />
          <Route  path="/signup" element={<SignUp/>} />
          <Route  path="/catalog" element={<Catalog/>} />
          <Route  path="/404" element={<NotFoundPage/>} />
          <Route  path="/contribueix" element={<Contribute/>} />
          <Route  path="/fonts/:sourceId" element={<DataSources/>} />
          <Route path="/catalog/:datasetId" element={<DatasetPage/>} />
      </Routes>
  </Router>
  </ThemeProvider>
  );
}

export default App;
