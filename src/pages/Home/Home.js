import React, { useEffect, useRef } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DynamicTyping from '../../components/DynamicTyping';
import About from '../../components/About';
import Timeline from '../../components/Timeline/Timeline';
import Seo from '../../components/Seo';
import homeConfig from '../../assets/configs/homeConfig';
import Hero from '../../components/Hero';
import { useLang } from '../../utils/i18n';
import Project from '../../components/Project/index'; // ✅ ADDED

// Simple scroll progress indicator using requestAnimationFrame
function ScrollIndicator() {
  const progressRef = useRef(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? scrolled / documentHeight : 0;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        zIndex: 9999,
        overflow: 'hidden',
        backgroundColor: 'rgba(11, 18, 32, 0.2)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box
        ref={progressRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'scaleX(0)',
          transformOrigin: '0 0',
          transition: 'transform 0.1s ease-out',
          backgroundColor: '#06b6d4',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
        }}
      />
    </Box>
  );
}

export default function Home() {
  const [lang] = useLang();
  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

  const titles = homeConfig.titles_i18n?.[lang] || homeConfig.titles || ['Data Scientist'];
  const about = homeConfig.about_i18n?.[lang] || homeConfig.about || { start: '', exit: '' };

  const timelineItems = (homeConfig.workTimeline || []).map((it) => ({
    ...it,
    title: it.title_i18n?.[lang] || it.title,
    description: it.description_i18n?.[lang] || it.description,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ali Asghar',
    url: canonical,
    jobTitle: titles?.[0] || 'Data Scientist',
  };

  const greetingNode = homeConfig.greeting_i18n?.[lang] || homeConfig.greeting;
  const ExperienceLabel = lang === 'es' ? 'Experiencia' : 'Experience';
  const ProjectsLabel = lang === 'es' ? 'Proyectos' : 'Projects'; 

  return (
    <section>
      <Seo
        title={lang === 'es' ? 'Ali — Científico de Datos' : 'Ali — Data Scientist'}
        description={
          lang === 'es'
            ? 'Consultoría en ML y datos: LLMs, RAG, AutoML, analítica en Azure. Proyectos, artículos y experiencia.'
            : 'ML & data consulting: LLMs, RAG, AutoML, analytics on Azure. Selected projects, writing, and experience.'
        }
        canonical={canonical}
        jsonLd={jsonLd}
      />

      {/* Scroll Progress Indicator */}
      <ScrollIndicator />

      <Hero />

      {/* ── Greeting + About ── */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid2 container spacing={4} alignItems="center">
          <Grid2 xs={12} md={6}>
            {React.isValidElement(greetingNode) ? (
              <Box sx={{ mb: 1 }}>{greetingNode}</Box>
            ) : (
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                {greetingNode}
              </Typography>
            )}
            <Box sx={{ color: 'text.secondary', fontSize: 18 }}>
              <DynamicTyping titles={titles} />
            </Box>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <About about={about} />
          </Grid2>
        </Grid2>
      </Container>

      {/* ── Projects Section ── ADDED BETWEEN ABOUT AND TIMELINE */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography component="h2" variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          {ProjectsLabel}
        </Typography>
        <Project />
      </Container>

      {/* ── Experience / Timeline ── */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography component="h2" variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          {ExperienceLabel}
        </Typography>
        <Box sx={{ width: '100%', maxWidth: '960px' }}>
          <Timeline items={timelineItems} />
        </Box>
      </Container>

    </section>
  );
}