/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import { Container, Box, Typography, Button, Stack, Fade } from '@mui/material';
import FooterItems from './FooterItems';
import { useLang } from '../../utils/i18n';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const COPY = {
  en: {
    headline: "Let's build something that enhances your business",
    sub: "Strategy, prototypes, and production ML in weeks — not quarters.",
    cta: "Book a Call",
    projects: "View Projects",
    whatsappMessage: "Hello Ali, I'd like to book a call to discuss a project.",
  },
  es: {
    headline: "Construyamos algo que mejore tu negocio",
    sub: "Estrategia, prototipos y ML en producción en semanas — no trimestres.",
    cta: "Agendar llamada",
    projects: "Ver proyectos",
    whatsappMessage: "Hola Ali, me gustaría agendar una llamada para discutir un proyecto.",
  },
};

export default function Footer() {
  const [lang] = useLang();
  const t = COPY[lang] || COPY.en;

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(t.whatsappMessage);
    const phoneNumber = '923202376159';
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }, [t.whatsappMessage]);

  const calendlyUrl = useMemo(() => {
    // Replace with your actual Calendly link if available
    const baseUrl = 'https://calendly.com/aliasghar';
    return baseUrl;
  }, []);

  return (
    <Fade in={true} timeout={800}>
      <Box
        component="footer"
        sx={{
          bgcolor: 'background.footer',
          color: 'text.footer',
          mt: 'auto',
          py: { xs: 5, md: 6 },
          borderTop: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(180deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 1) 100%)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          },
        }}
      >
        {/* Subtle background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(37, 211, 102, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              mb: 2,
              color: 'inherit',
              fontSize: { xs: '1.75rem', md: '2.125rem' },
            }}
          >
            {t.headline}
          </Typography>
          <Typography
            sx={{
              opacity: 0.9,
              mb: 4,
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {t.sub}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 5 }}
          >
            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              aria-label={t.cta}
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: '0.9375rem',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
                  background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
                },
              }}
            >
              {t.cta}
            </Button>

            <Button
              href="/projects"
              variant="outlined"
              size="large"
              sx={{
                color: 'inherit',
                borderColor: 'rgba(255,255,255,0.3)',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                fontWeight: 700,
                fontSize: '0.9375rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.6)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {t.projects}
            </Button>
          </Stack>

          <FooterItems />

          <Typography
            variant="body2"
            sx={{
              display: 'block',
              mt: 4,
              opacity: 0.7,
              color: 'inherit',
              fontSize: '0.875rem',
            }}
          >
            © {new Date().getFullYear()} Ali Asghar. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Fade>
  );
}