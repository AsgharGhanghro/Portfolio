/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const SkillsItems = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      gap: { xs: 2, sm: 2.5, md: 3 },
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto',
      my: { xs: 1, sm: 2 }
    }}>
      {props.config.map((item) => (
        <Box
          key={item.id}
          sx={{
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#263238',
            textAlign: 'center',
            p: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            bgcolor: theme.palette.mode === 'dark' 
              ? '#000000' // Pure black for darker boxes
              : '#ffffff',
            borderRadius: '16px',
            boxShadow: theme.palette.mode === 'dark'
              ? '0px 8px 32px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255,255,255,0.05)'
              : '0px 8px 24px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
            flex: '0 0 auto',
            width: { 
              xs: 'calc(50% - 16px)', // 2 columns on mobile
              sm: 'calc(33.333% - 20px)', // 3 columns on tablet
              md: 'calc(25% - 24px)', // 4 columns on desktop
              lg: props.config.length <= 6 ? 'calc(16.666% - 24px)' : 'calc(20% - 24px)' // 6 columns for main skills, 5 for complementary
            },
            minHeight: { xs: 110, sm: 130, md: 150 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: theme.palette.mode === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.05)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0px 16px 40px rgba(0, 0, 0, 1), inset 0 0 0 1px rgba(255,255,255,0.1)'
                : '0px 12px 32px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              bgcolor: theme.palette.mode === 'dark'
                ? '#000000' // Stay pure black on hover
                : '#f8f9fa'
            },
            '& svg': {
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
              filter: theme.palette.mode === 'dark' ? 'brightness(1.1)' : 'none',
              mb: { xs: 0.5, sm: 0.75, md: 1 }
            }
          }}
        >
          {item.icon}
          <Typography 
            variant="body2" 
            sx={{ 
              mt: { xs: '0.25rem', sm: '0.5rem' }, 
              fontWeight: 600,
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' },
              lineHeight: 1.2,
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit'
            }}
          >
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SkillsItems;