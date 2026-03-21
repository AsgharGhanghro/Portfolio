import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import SkillsItems from './SkillsItems';
import skillsConfig from '../../assets/configs/skillsConfig';
import { useLang } from '../../utils/i18n';

const UI = {
  en: {
    main: 'Main Skills & Tools',
    complementary: 'Complementary Skills & Tools',
  },
  es: {
    main: 'Habilidades y herramientas principales',
    complementary: 'Habilidades y herramientas complementarias',
  },
};

const Section = ({ title, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(10, 10, 10, 0.98)' // Darker background for contrast
          : '#ffffff',
        borderRadius: '20px',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 10px 40px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.6)'
          : '0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
        mx: 'auto',
        width: '100%',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
    >
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        component="h2" 
        sx={{ 
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50', 
          mb: { xs: 2, sm: 3, md: 4 },
          fontWeight: 700,
          letterSpacing: -0.3,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default function Skills() {
  const [lang] = useLang();
  const t = UI[lang] || UI.en;
  

  return (
    <section id="skills">
      <Container 
        maxWidth="xl" 
        sx={{ 
          mb: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Section title={t.main}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: '100%'
          }}>
            <SkillsItems config={skillsConfig.mainSkills} />
          </Box>
        </Section>
      </Container>

      <Container 
        maxWidth="xl" 
        sx={{ 
          mb: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Section title={t.complementary}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: '100%'
          }}>
            <SkillsItems config={skillsConfig.complementarySkills} />
          </Box>
        </Section>
      </Container>
    </section>
  );
}