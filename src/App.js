import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import ReactGA from 'react-ga';
import Chatbot from './components/Chatbot'
import { createCustomTheme } from './theme';
import Contact from './pages/Contact';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import './master-styles.css'
import Skills from './pages/Skills/Skills';

if (process.env.REACT_APP_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
}

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    if (!process.env.REACT_APP_TRACKING_ID) return;
    const page = location.pathname + location.search;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }, [location]);
  return null;
}

export default function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${mode}-mode`);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <Router>
          <AnalyticsTracker />
          <NavBar toggleTheme={toggleTheme} themeMode={mode} />
          <Box 
            component="main" 
            sx={{ 
              flex: 1,
              backgroundColor: 'background.default',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Router>
        <Chatbot />
      </Box>
    </ThemeProvider>
  );
}


