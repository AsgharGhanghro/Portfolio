import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = ({ toggleTheme, mode }) => {
  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="toggle theme"
        size="small"
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {mode === 'light' ? (
          <Brightness4 fontSize="small" />
        ) : (
          <Brightness7 fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;