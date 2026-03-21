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
import blogConfig from '../assets/configs/blogConfig';
import Seo from '../components/Seo';
import { withUtm } from '../utils/withUtm';
import { useLang } from '../utils/i18n';

const UI = {
  en: {
    seoTitle: 'Writing & Insights — Ali Asghar',
    seoDesc: 'Notes, articles, and insights on data science, ML, and entrepreneurship.',
    overline: 'Blog',
    title: 'Writing & Insights',
    desc: 'Deep dives and quick notes on ML, data systems, and building products.',
    searchPlaceholder: 'Search posts',
    sortRecent: 'Most Recent',
    sortAZ: 'Title (A → Z)',
    ctaRead: 'Read',
    featured: 'Featured',
    stripQ: 'Looking to build ML to production?',
    stripSee: 'See projects',
    stripTalk: "Let's talk",
    new: 'New',
    mins: (m) => `${m} min`,
  },
  es: {
    seoTitle: 'Escritura & Notas — Ali Asghar',
    seoDesc: 'Notas, artículos e ideas sobre ciencia de datos, ML y emprendimiento.',
    overline: 'Blog',
    title: 'Artículos y notas',
    desc: 'Análisis profundos y notas rápidas sobre ML, sistemas de datos y creación de productos.',
    searchPlaceholder: 'Buscar artículos',
    sortRecent: 'Más recientes',
    sortAZ: 'Título (A → Z)',
    ctaRead: 'Leer',
    featured: 'Destacados',
    stripQ: '¿Buscas implementar ML en producción?',
    stripSee: 'Ver proyectos',
    stripTalk: 'Hablemos',
    new: 'Nuevo',
    mins: (m) => `${m} min`,
  },
};

// Social/link button (kept minimal)
const LinkButton = ({ link }) => (
  <Tooltip title={link.name} placement="top">
    <IconButton
      size="small"
      component="a"
      href={withUtm(link.url, 'blogs_page')}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
    >
      {link.icon ? (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { fontSize: 18 } }}>{link.icon}</Box>
      ) : (
        <OpenInNewIcon fontSize="inherit" />
      )}
    </IconButton>
  </Tooltip>
);


const BlogCard = ({ item, lang = 'en', ui = UI.en }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const desc = item.description_i18n?.[lang] || item.description_i18n?.en || '';
  const categoryLabel =
    typeof item.category === 'string' ? item.category : item.category?.[lang] || item.category?.en;

  const isNew = item.isNew === true || (item.date && Date.now() - new Date(item.date).getTime() < 1000 * 60 * 60 * 24 * 60); // < 60 days

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[4],
      }
    }}>
      {item.image && (
        <Box sx={{ 
          position: 'relative', 
          pt: '56.25%', 
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            sx={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          {categoryLabel && (
            <Chip
              size="small"
              color="secondary"
              label={categoryLabel}
              sx={{ 
                position: 'absolute', 
                top: 10, 
                left: 10, 
                fontWeight: 800,
                fontSize: isMobile ? '0.65rem' : '0.75rem'
              }}
            />
          )}
        </Box>
      )}

      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1,
        p: isMobile ? 1.5 : 2
      }}>
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          fontWeight={800} 
          sx={{ 
            letterSpacing: -0.2,
            fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.25rem'
          }}
        >
          {item.title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {item.date && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}
            >
              {new Date(item.date).toLocaleDateString()}
            </Typography>
          )}
          {item.read_mins && (
            <Chip 
              size="small" 
              variant="outlined" 
              label={ui.mins(item.read_mins)}
              sx={{ 
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                height: isMobile ? 20 : 24
              }}
            />
          )}
          {isNew && (
            <Chip 
              size="small" 
              color="secondary" 
              label={ui.new}
              sx={{ 
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                height: isMobile ? 20 : 24
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
            overflow: 'hidden'
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
          {item.links?.map((l) => (
            <LinkButton key={l.name} link={l} />
          ))}
        </Stack>
        {item.links?.[0]?.url && (
          <Button
            size={isMobile ? "small" : "medium"}
            variant="contained"
            color="secondary"
            href={withUtm(item.links?.[0]?.url, 'blogs_page')}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              px: isMobile ? 1.5 : 2
            }}
          >
            {ui.ctaRead}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

// --------------- PAGE -----------------
export default function Blogs() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');
  const [lang] = useLang();
  const t = UI[lang];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;
  const EMAIL = process.env.EMAIL || '';

  const categories = useMemo(() => {
    const set = new Set(['All']);
    blogConfig.forEach((it) => {
      if (it.category) {
        const label = typeof it.category === 'string' ? it.category : it.category?.[lang] || it.category?.['en'];
        if (label) set.add(label);
      }
    });
    return Array.from(set);
  }, [lang]);

  const items = useMemo(() => {
    const filtered = blogConfig.filter((it) => {
      const label = typeof it.category === 'string' ? it.category : it.category?.[lang] || it.category?.en;
      return category === 'All' ? true : label === category;
    });

    const q = query.trim().toLowerCase();
    const searched = q
      ? filtered.filter((it) =>
          (it.title || '').toLowerCase().includes(q) ||
          (it.description_i18n?.en || '').toLowerCase().includes(q) ||
          (it.description_i18n?.es || '').toLowerCase().includes(q)
        )
      : filtered;

    const sorted = [...searched].sort((a, b) => {
      if (sort === 'az') return (a.title || '').localeCompare(b.title || '');
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

    return sorted;
  }, [category, query, sort, lang]);

  // --------- Featured row (pinned) ---------
  const featured = useMemo(() => {
    const pinned = items.filter((x) => x.pinned);
    if (pinned.length > 0) return pinned.slice(0, 3);
    // Fallback: show first 3 recent posts
    return items.slice(0, 3);
  }, [items]);

  const rest = useMemo(() => items.filter((x) => !featured.includes(x)), [items, featured]);
  
  // Responsive featured layout
  const getFeaturedGridSize = () => {
    if (isMobile) return 12;
    if (isTablet) {
      if (featured.length === 1) return 12;
      if (featured.length === 2) return 6;
      return 6;
    }
    if (featured.length === 1) return 12;
    if (featured.length === 2) return 6;
    return 4;
  };

  return (
    <>
      <Seo title={t.seoTitle} description={t.seoDesc} canonical={canonical} />

      {/* Header */}
      <Box
        sx={{
          background: (th) => `linear-gradient(180deg, ${th.palette.background.default} 0%, #ffffff 100%)`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: { xs: 3, sm: 4, md: 6, lg: 8 },
          mb: 0,
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
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3rem' }
              }}
            >
              {t.title}
            </Typography>
            <Typography 
              color="text.secondary" 
              sx={{ 
                maxWidth: 720,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              {t.desc}
            </Typography>

            {/* Controls */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              {/* Category chips */}
              <Box sx={{ 
                overflowX: 'auto', 
                pb: 1,
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 }
              }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'nowrap', width: 'max-content' }}>
                  {categories.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      color={c === category ? 'secondary' : 'default'}
                      variant={c === category ? 'filled' : 'outlined'}
                      onClick={() => setCategory(c)}
                      sx={{ 
                        borderRadius: 10,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        flexShrink: 0
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />

              {/* Search + sort */}
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
                    minWidth: { xs: '100%', sm: 200 },
                    '& .MuiInputBase-root': { 
                      height: { xs: 40, sm: 36 } 
                    }
                  }}
                />
                <Divider 
                  orientation={isMobile ? "horizontal" : "vertical"} 
                  flexItem 
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
                    minWidth: { xs: '100%', sm: 160 },
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

      {/* Inline conversion CTA */}
      <Container maxWidth="lg" sx={{ mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={(th) => ({
          p: { xs: 2, sm: 2.5 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
          background: `linear-gradient(90deg, ${th.palette.secondary.main}14, transparent)`,
          flexDirection: { xs: 'column', sm: 'row' }
        })}>
          <Typography sx={{ 
            fontWeight: 700,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            {t.stripQ}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button 
              size="small" 
              variant="contained" 
              color="secondary" 
              href="/projects"
              fullWidth={isMobile}
            >
              {t.stripSee}
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              href={withUtm(EMAIL ? `mailto:${EMAIL}` : '#', 'blogs_inline_cta')}
              fullWidth={isMobile}
            >
              {t.stripTalk}
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Featured row */}
      {featured.length > 0 && (
        <Container maxWidth="lg" sx={{ 
          pt: 4, 
          px: { xs: 2, sm: 3, md: 4 } 
        }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
            }}
          >
            {t.featured}
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {featured.map((item) => (
              <Grid 
                key={item.id} 
                item 
                xs={12} 
                sm={getFeaturedGridSize()}
                md={getFeaturedGridSize()}
              >
                <BlogCard item={item} lang={lang} ui={t} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Main grid */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 3, sm: 4, md: 6 }, 
        px: { xs: 2, sm: 3, md: 4 } 
      }}>
        <Grid container spacing={3}>
          {rest.map((item) => (
            <Grid 
              key={item.id} 
              item 
              xs={12} 
              sm={6} 
              md={4}
              lg={4}
            >
              <BlogCard item={item} lang={lang} ui={t} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}