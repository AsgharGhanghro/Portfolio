import React from 'react';
import { Paper, Typography, Box, Stack, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { useLang } from '../../utils/i18n';

/**
 * Clean, theme-matched timeline (no heavy gradients), bilingual date tweak
 * MOBILE: Icons on LEFT (centered with card), Cards on RIGHT with vertical line
 */
const Timeline = ({ items = [], position = 'alternate' }) => {
  const [lang] = useLang();

  const localizeDate = (d) => {
    if (typeof d !== 'string') return d;
    return lang === 'es' ? d.replace(/Present/i, 'Actualidad') : d;
  };

  return (
    <MuiTimeline 
      position={position} 
      sx={{
        // Remove default gutter line
        '& .MuiTimelineItem-root:before': { 
          flex: 0, 
          padding: 0 
        },
        
        // MOBILE: Icons left (centered), Cards right with vertical line
        '@media (max-width: 768px)': {
          padding: 0,
          '& .MuiTimelineItem-root': {
            flexDirection: 'row',
            alignItems: 'stretch', // Stretch to fill height
            marginBottom: 3,
            '&:before': {
              display: 'none',
            },
          },
          // Hide opposite content on mobile
          '& .MuiTimelineOppositeContent-root': {
            display: 'none',
          },
          // Separator column with vertical line
          '& .MuiTimelineSeparator-root': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 0,
            marginRight: 2,
            minHeight: '100%', // Take full height of item
          },
          // Dot styling - centered
          '& .MuiTimelineDot-root': {
            margin: '0 !important',
            // Center vertically with card content
            '@media (max-width: 768px)': {
              margin: '0 auto !important',
            },
          },
          // Connector - vertical line between dots
          '& .MuiTimelineConnector-root': {
            flex: 1,
            minHeight: 16, // Space between dot and next item
            margin: '0 auto !important',
          },
          // Content area - centered vertically with dot
          '& .MuiTimelineContent-root': {
            padding: '12px 0 !important',
            paddingLeft: 0,
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center', // Center vertically with dot
            minHeight: 100, // Match the dot area height
            flex: 1,
          },
        },
        // Ensure last item doesn't have connector
        '& .MuiTimelineItem-root:last-child .MuiTimelineConnector-root': {
          display: 'none',
        },
      }}
    >
      {items.map((item, index) => {
        const { id, date, icon, title, company, description, tags = [] } = item || {};
        const isLastItem = index === items.length - 1;

        return (
          <TimelineItem key={id}>
            {/* Date pill (right on desktop, hidden on mobile - will show in card) */}
            <TimelineOppositeContent
              sx={{
                my: 'auto',
                textAlign: { xs: 'center', md: 'right' },
                minWidth: { md: 140 },
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Chip
                label={localizeDate(date)}
                size="small"
                variant="outlined"
                sx={(th) => ({
                  borderColor: th.palette.divider,
                  bgcolor: alpha(th.palette.secondary.main, 0.06),
                  fontWeight: 600,
                })}
              />
            </TimelineOppositeContent>

            {/* Axis + dot + vertical line */}
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={(th) => ({
                  borderColor: th.palette.secondary.main,
                  backgroundColor: th.palette.background.paper,
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,.06)',
                  // Center the dot
                  '@media (max-width: 768px)': {
                    margin: '0 auto !important',
                  },
                })}
              >
                <Box sx={(th) => ({ fontSize: 22, color: th.palette.secondary.main })}>{icon}</Box>
              </TimelineDot>
              {/* Vertical line - show except for last item */}
              {!isLastItem && (
                <TimelineConnector 
                  sx={(th) => ({ 
                    backgroundColor: th.palette.divider, 
                    width: 2,
                    flex: 1,
                    minHeight: 16,
                    // Center the vertical line
                    '@media (max-width: 768px)': {
                      margin: '0 auto !important',
                    },
                  })} 
                />
              )}
            </TimelineSeparator>

            {/* Card content - Right side, centered with dot */}
            <TimelineContent sx={{ 
              py: { xs: 1, md: 2 },
              px: { xs: 0, md: 2 },
              // Center vertically with dot on mobile
              '@media (max-width: 768px)': {
                display: 'flex',
                alignItems: 'center',
                minHeight: 100,
                pl: 2,
                pr: 1,
              },
            }}>
              <Paper
                elevation={0}
                sx={(th) => ({
                  p: 2,
                  borderRadius: 3,
                  border: `1px solid ${th.palette.divider}`,
                  backgroundColor: th.palette.background.paper,
                  boxShadow: '0 6px 20px rgba(15,18,32,0.06), 0 1px 2px rgba(15,18,32,0.03)',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 28px rgba(15,18,32,0.10), 0 3px 10px rgba(15,18,32,0.06)',
                  },
                  // Left align on mobile
                  '@media (max-width: 768px)': {
                    textAlign: 'left',
                    margin: 0,
                    width: '100%',
                  },
                })}
              >
                <Stack spacing={0.75}>
                  {/* Date on mobile - show at top of card */}
                  <Box sx={{ 
                    display: { xs: 'block', md: 'none' },
                    mb: 1,
                  }}>
                    <Chip
                      label={localizeDate(date)}
                      size="small"
                      variant="outlined"
                      sx={(th) => ({
                        borderColor: th.palette.divider,
                        bgcolor: alpha(th.palette.secondary.main, 0.06),
                        fontWeight: 600,
                      })}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.2 }}>
                    {title}
                  </Typography>
                  {company && (
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      {company}
                    </Typography>
                  )}
                  {description && (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {description}
                    </Typography>
                  )}

                  {/* Tags */}
                  {Array.isArray(tags) && tags.length > 0 && (
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      useFlexGap 
                      flexWrap="wrap" 
                      sx={{ 
                        pt: 0.5,
                        '@media (max-width: 768px)': {
                          justifyContent: 'flex-start',
                        },
                      }}
                    >
                      {tags.map((t) => (
                        <Chip
                          key={t}
                          size="small"
                          label={t}
                          sx={(th) => ({
                            bgcolor: alpha(th.palette.secondary.main, 0.16),
                            border: `1px solid ${alpha(th.palette.secondary.main, 0.35)}`,
                            color: th.palette.primary.main,
                            fontWeight: 700,
                          })}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </MuiTimeline>
  );
};

export default Timeline;