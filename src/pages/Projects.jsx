/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search as SearchIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import projectConfig from '../assets/configs/projectConfig';
import Seo from '../components/Seo';
import { withUtm } from '../utils/withUtm';
import { useLang } from '../utils/i18n';

const UI = {
  en: {
    seoTitle: 'Projects | Ali Asghar',
    seoDesc: 'Open-source libraries, systems, and real-world projects by Ali Asghar.',
    overline: 'Selected Work',
    title: 'Projects',
    desc:
      'A curated collection spanning production-grade libraries, data systems, and this website. Filter, search, and explore.',
    searchPlaceholder: 'Search projects',
    sortRecent: 'Recent',
    sortAZ: 'A → Z',
    ctaView: 'View',
  },
  es: {
    seoTitle: 'Proyectos | Ali Asghar',
    seoDesc: 'Librerías open-source, sistemas y proyectos reales de Ali Asghar.',
    overline: 'Trabajo destacado',
    title: 'Proyectos',
    desc:
      'Una colección curada que abarca librerías, modelos de ML y este sitio web. Filtra, busca y explora.',
    searchPlaceholder: 'Buscar proyectos',
    sortRecent: 'Recientes',
    sortAZ: 'A → Z',
    ctaView: 'Ver',
  },
};

const LinkButton = ({ link }) => (
  <Tooltip title={link.name} placement="top">
    <IconButton
      size="small"
      component="a"
      href={withUtm(link.url, 'projects_page')}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
    >
      {link.icon ? (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { fontSize: 18 } }}>
          {link.icon}
        </Box>
      ) : (
        <OpenInNewIcon fontSize="inherit" />
      )}
    </IconButton>
  </Tooltip>
);

const ProjectCard = ({ project, lang = 'en' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const desc = project.description_i18n?.[lang] || project.description_i18n?.en || '';
  const categoryLabel =
    typeof project.category === 'string'
      ? project.category
      : project.category?.[lang] || project.category?.en;

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[4],
      }
    }}>
      {/* Image placeholder 16:9 to prevent layout shift */}
      <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={project.image}
          alt={project.title}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.05) contrast(1.05)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />
      </Box>

      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1,
        p: isMobile ? 1.5 : 2
      }}>
        <Stack 
          direction={isMobile ? "column" : "row"} 
          alignItems={isMobile ? "flex-start" : "center"} 
          justifyContent="space-between" 
          spacing={1}
        >
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            fontWeight={800} 
            sx={{ 
              letterSpacing: -0.2,
              fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.25rem',
              lineHeight: 1.3
            }}
          >
            {project.title}
          </Typography>
          {categoryLabel && (
            <Chip 
              size="small" 
              label={categoryLabel}
              sx={{ 
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                height: isMobile ? 22 : 24
              }}
            />
          )}
        </Stack>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontSize: isMobile ? '0.85rem' : '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}
        >
          {desc}
        </Typography>
      </CardContent>

      <CardActions sx={{ 
        px: isMobile ? 1.5 : 2, 
        pb: isMobile ? 1.5 : 2, 
        pt: 0, 
        justifyContent: 'space-between'
      }}>
        <Stack direction="row" spacing={0.5}>
          {project.links?.map((l) => (
            <LinkButton key={l.name} link={l} />
          ))}
        </Stack>
        <Button
          size={isMobile ? "small" : "medium"}
          variant="contained"
          color="secondary"
          href={withUtm(project.links?.[0]?.url || '#', 'projects_page')}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            px: isMobile ? 1.5 : 2,
            minWidth: isMobile ? 60 : 70
          }}
        >
          {UI[lang].ctaView}
        </Button>
      </CardActions>
    </Card>
  );
};

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');
  const [lang] = useLang();
  const t = UI[lang];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const projects = useMemo(() => {
    const filtered = projectConfig.filter((p) => {
      if (category === 'All') return true;
      const label =
        typeof p.category === 'string' ? p.category : p.category?.[lang] || p.category?.en;
      return label === category;
    });

    const q = query.trim().toLowerCase();
    const searched = q
      ? filtered.filter(
          (p) =>
            (p.title || '').toLowerCase().includes(q) ||
            (p.description_i18n?.en || '').toLowerCase().includes(q) ||
            (p.description_i18n?.es || '').toLowerCase().includes(q)
        )
      : filtered;

    return [...searched].sort((a, b) => {
      if (sort === 'az') return (a.title || '').localeCompare(b.title || '');
      return 0; // 'recent' keeps config order
    });
  }, [category, query, sort, lang]);

  const categoryChips = useMemo(() => {
    const labels = new Set(['All']); // keep sentinel value; display text stays as-is
    projectConfig.forEach((p) => {
      if (p.category) {
        const label =
          typeof p.category === 'string' ? p.category : p.category?.[lang] || p.category?.en;
        labels.add(label);
      }
    });
    return Array.from(labels);
  }, [lang]);

  return (
    <>
      <Seo title={t.seoTitle} description={t.seoDesc} />

      {/* Header */}
      <Box
        sx={{
          background: (th) =>
            `linear-gradient(180deg, ${th.palette.background.default} 0%, #ffffff 100%)`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: { xs: 3, sm: 4, md: 6, lg: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Stack spacing={2}>
            <Typography 
              variant="overline" 
              color="secondary.main" 
              fontWeight={800}
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' } }}
            >
              {t.overline}
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 900, 
                letterSpacing: -0.8,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3rem' },
                lineHeight: 1.2
              }}
            >
              {t.title}
            </Typography>
            <Typography 
              color="text.secondary" 
              sx={{ 
                maxWidth: 720,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                lineHeight: 1.6
              }}
            >
              {t.desc}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              {/* Category chips - horizontal scroll on mobile */}
              <Box sx={{ 
                overflowX: 'auto', 
                pb: 1,
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { 
                  bgcolor: 'divider', 
                  borderRadius: 2 
                }
              }}>
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ 
                    flexWrap: 'nowrap', 
                    width: 'max-content',
                    py: 0.5
                  }}
                >
                  {categoryChips.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      color={c === category ? 'secondary' : 'default'}
                      variant={c === category ? 'filled' : 'outlined'}
                      onClick={() => setCategory(c)}
                      sx={{ 
                        borderRadius: 10,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        flexShrink: 0,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ 
                flexGrow: 1, 
                display: { xs: 'none', sm: 'block' } 
              }} />

              {/* Search + sort - stack vertically on mobile */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={1} 
                alignItems="stretch"
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <TextField
                  size="small"
                  placeholder={t.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 200, md: 240 },
                    '& .MuiInputBase-root': { 
                      height: { xs: 40, sm: 36 } 
                    }
                  }}
                />
                <Divider 
                  flexItem 
                  orientation={isMobile ? "horizontal" : "vertical"} 
                  sx={{ 
                    my: isMobile ? 1 : 0,
                    display: { xs: 'block', sm: 'block' }
                  }} 
                />
                <Select 
                  size="small" 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value)}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 140, md: 160 },
                    '& .MuiSelect-select': { 
                      py: { xs: 1.25, sm: 0.875 } 
                    }
                  }}
                >
                  <MenuItem value="recent">{t.sortRecent}</MenuItem>
                  <MenuItem value="az">{t.sortAZ}</MenuItem>
                </Select>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Grid */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 3, sm: 4, md: 6 }, 
          px: { xs: 2, sm: 3, md: 4 } 
        }}
      >
        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid 
              key={p.id} 
              item 
              xs={12} 
              sm={6} 
              md={4}
              lg={4}
            >
              <ProjectCard project={p} lang={lang} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}