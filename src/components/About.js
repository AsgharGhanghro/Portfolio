/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  useTheme
} from '@mui/material';
import homeConfig from '../assets/configs/homeConfig';
import ResumeModal from './ResumeModal';

const About = (props) => {
  const { about, language = 'en' } = props || {};
  const { start, exit } = about || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const resumeText = homeConfig.resume_i18n[language];

  // Determine colors based on theme mode
  const isDarkMode = theme.palette.mode === 'dark';
  const cardBg = isDarkMode ? '#1a2332' : '#ffffff';
  const cardText = isDarkMode ? '#ffffff' : '#263238';
  const cardSecondaryText = isDarkMode ? '#b0bec5' : '#5B6B7A';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <>
      <Box id="about" sx={{ my: 4 }}>
        <Card sx={{ 
          backgroundColor: cardBg, 
          color: cardText,
          border: `1px solid ${borderColor}`,
          borderRadius: 3,
          boxShadow: theme.shadows[2],
          transition: 'all 0.3s ease',
          overflow: 'hidden', 
        }}>
        
          <Box sx={{
            backgroundColor: '#0a0e14c6', // Blackish-gray background
            height: '40px', 
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            position: 'relative',
          }}>
            {/* Subtle separator line at bottom */}
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'rgba(255, 255, 255, 0.05)',
            }} />
            
            {/* Three colored dots */}
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Box sx={{ 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%',
                backgroundColor: '#48bb78', // Green
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }} />
              <Box sx={{ 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%',
                backgroundColor: '#ed8936', // Yellow/Orange
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }} />
              <Box sx={{ 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%',
                backgroundColor: '#f56565', // Red
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }} />
            </Box>
          </Box>
          
          <CardContent sx={{ 
            lineHeight: 1.6,
            backgroundColor: cardBg,
            color: cardText,
            p: { xs: 2, sm: 3 },
          }}>
            <Typography variant="body1" paragraph sx={{ color: cardText, mb: 2 }}>
              {start}
            </Typography>
            <Typography variant="body1" sx={{ color: cardText }}>
              {exit}
            </Typography>
            
            {/* RESUME SECTION */}
            {homeConfig.resumeConfig.enabled && (
              <Box sx={{ 
                mt: 4, 
                pt: 3, 
                borderTop: `1px solid ${borderColor}`,
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2,
                p: 2,
              }}>
                <Typography variant="h6" sx={{ 
                  color: theme.palette.secondary.main, 
                  mb: 1.5, 
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  {language === 'es' ? 'Currículum Profesional' : 'Professional Resume'}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: cardSecondaryText, 
                  mb: 2.5,
                  fontSize: '0.95rem'
                }}>
                  {resumeText.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={openModal}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: '#0B1220',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${theme.palette.secondary.main}40`,
                    },
                    fontWeight: 600,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {resumeText.buttonText}
                </Button>
                <Typography variant="caption" sx={{ 
                  display: 'block', 
                  color: cardSecondaryText, 
                  mt: 1.5,
                  fontSize: '0.8rem'
                }}>
                  {language === 'es' 
                    ? 'Haz clic para ver el currículum completo y descargar la versión PDF' 
                    : 'Click to view complete resume and download PDF version'
                  }
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Resume Modal with language prop */}
      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        language={language}
      />
    </>
  );
};

export default About;