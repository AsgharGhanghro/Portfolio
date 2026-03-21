import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import NavBarItems from './NavBarItems';
import LanguageSwitch from './LanguageSwitch';
import ThemeToggle from '../ThemeToggle';

const NavBar = ({ toggleTheme, themeMode }) => {
  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ 
          bgcolor: 'background.navbar',  // Using custom navbar background
          borderBottom: '1px solid', 
          borderColor: 'divider', 
          zIndex: 1400, 
          backdropFilter: 'blur(6px)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          width: '100%',
          minHeight: { xs: 56, sm: 64 }
        }}>
          {/* Left side - Navigation items */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-start'
          }}>
            <NavBarItems />
          </Box>
          
          {/* Right side - Language and Theme toggles */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexShrink: 0
          }}>
            <LanguageSwitch size="small" />
            
            {toggleTheme && themeMode && (
              <ThemeToggle 
                toggleTheme={toggleTheme} 
                mode={themeMode} 
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />
    </>
  );
};

export default NavBar;