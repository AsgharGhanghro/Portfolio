import React from 'react';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useLang } from '../utils/i18n';
import { withUtm } from '../utils/withUtm';

const UI = {
  en: {
    h1_a: 'Build ',
    h1_b: 'Production ML ',
    h1_c: 'Faster & Smarter',
    sub: 'I work on machine learning projects involving LLM assistants and Retrieval-Augmented Generation (RAG), along with AutoML experiments and data analytics, taking solutions from prototyping to production-ready deployments on Azure.',
    bullets: [
      { icon: <RocketLaunchIcon />, label: 'Weeks, not quarters' },
      { icon: <AutoAwesomeIcon />, label: 'LLMs, RAG, AutoML' },
      { icon: <SecurityIcon />, label: 'Production-ready systems' },
    ],
    ctaPrimary: 'Book a Free Intro Call',
    ctaSecondary: 'See Projects',
  },
  es: {
    h1_a: 'Lleva ',
    h1_b: 'ML a producción ',
    h1_c: 'más rápido',
    sub: 'Trabajo en proyectos de ML con asistentes LLM y búsqueda RAG, además de AutoML y analítica, llevando soluciones de prototipo a producción en Azure.',
    bullets: [
      { icon: <RocketLaunchIcon />, label: 'Semanas, no trimestres' },
      { icon: <AutoAwesomeIcon />, label: 'LLMs, RAG, AutoML' },
      { icon: <SecurityIcon />, label: 'Listo para producción' },
    ],
    ctaPrimary: 'Agendar llamada',
    ctaSecondary: 'Ver proyectos',
  },
};

export default function Hero() {
  const [lang] = useLang();
  const t = UI[lang] || UI.en;

  // 🔹 CHANGE THIS NUMBER (Pakistan example: 92 + number, no +, no spaces)
  const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '923202376159';

  const whatsappMessage = encodeURIComponent(
    'Hello, I would like to book a free intro call.'
  );

  const whatsappHref = withUtm(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
    'hero_cta'
  );

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        color: '#fff',
        py: { xs: 8, md: 12 },
        background: `radial-gradient(1200px 600px at 20% -10%, ${theme.palette.secondary.main}33, transparent 60%),
                     linear-gradient(180deg, ${theme.palette.primary.main} 0%, #0b1220 60%, #08101a 100%)`,
        overflow: 'hidden',
      })}
    >
      {/* Glow */}
      <Box
        sx={{
          position: 'absolute',
          width: 280,
          height: 280,
          right: -80,
          top: -80,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0) 60%)',
          filter: 'blur(6px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1.1,
              fontSize: { xs: 36, md: 56 },
            }}
          >
            {t.h1_a}
            <Box
              component="span"
              sx={{
                background: (th) =>
                  `linear-gradient(90deg, ${th.palette.secondary.main}, #7dd3fc)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 24px rgba(125,211,252,.25)',
              }}
            >
              {t.h1_b}
            </Box>
            {t.h1_c}
          </Typography>

          {/* Subheadline */}
          <Typography
            sx={{
              maxWidth: 900,
              fontSize: { xs: 16, md: 18 },
              color: 'rgba(255,255,255,.86)',
            }}
          >
            {t.sub}
          </Typography>

          {/* Proof points */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
          >
            {t.bullets.map((b, i) => (
              <Chip
                key={i}
                icon={b.icon}
                label={b.label}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontWeight: 700,
                }}
              />
            ))}
          </Stack>

          {/* CTAs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              startIcon={<WhatsAppIcon />}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              size="large"
            >
              {t.ctaPrimary}
            </Button>

            <Button
              component="a"
              href="/projects"
              variant="outlined"
              size="large"
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}
            >
              {t.ctaSecondary}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
