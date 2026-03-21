import { createTheme } from '@mui/material/styles';

const lightPaletteTokens = {
  // Main content colors
  primary: '#0B1220',
  secondary: '#06B6D4',
  bg: '#F7FAFC',              // Light gray for main content
  paper: '#FFFFFF',
  textPrimary: '#0B1220',
  textSecondary: '#5B6B7A',
  divider: 'rgba(15, 18, 32, 0.12)',
  
  // Navbar/Footer specific (slightly darker)
  navbarBg: '#FFFFFF',
  footerBg: '#0B1220',        // Dark footer in light mode
  footerText: '#FFFFFF',
  
  info: '#0EA5E9',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#EF4444',
};

const darkPaletteTokens = {
  // Main content colors
  primary: '#FFFFFF',
  secondary: '#06B6D4',
  bg: '#0B1220',              // Dark blue for main content
  paper: '#1A2332',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  divider: 'rgba(255, 255, 255, 0.12)',
  
  // Navbar/Footer specific (darker)
  navbarBg: '#0A111E',        // Slightly darker than main
  footerBg: '#090E1A',        // Even darker for footer
  footerText: '#FFFFFF',
  
  info: '#38BDF8',
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#F87171',
};

// Create theme function to switch between modes
export const createCustomTheme = (mode = 'light') => {
  const paletteTokens = mode === 'light' ? lightPaletteTokens : darkPaletteTokens;
  
  return createTheme({
    palette: {
      mode,
      primary: { main: paletteTokens.primary },
      secondary: { main: paletteTokens.secondary },
      background: { 
        default: paletteTokens.bg, 
        paper: paletteTokens.paper,
        navbar: paletteTokens.navbarBg,
        footer: paletteTokens.footerBg,
      },
      text: { 
        primary: paletteTokens.textPrimary, 
        secondary: paletteTokens.textSecondary,
        footer: paletteTokens.footerText,
      },
      divider: paletteTokens.divider,
      info: { main: paletteTokens.info },
      success: { main: paletteTokens.success },
      warning: { main: paletteTokens.warning },
      error: { main: paletteTokens.error },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily:
        '"Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      h1: { fontWeight: 900, letterSpacing: -0.8 },
      h2: { fontWeight: 900, letterSpacing: -0.6 },
      h3: { fontWeight: 800, letterSpacing: -0.4 },
      h4: { fontWeight: 800 },
      subtitle1: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: paletteTokens.bg,
            color: paletteTokens.textPrimary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
          '::selection': {
            backgroundColor: mode === 'light' 
              ? 'rgba(6, 182, 212, 0.24)' 
              : 'rgba(6, 182, 212, 0.4)',
          },
          a: {
            color: paletteTokens.secondary,
            textDecoration: 'none',
          },
          'a:hover': {
            textDecoration: 'underline',
          },
        },
      },
      MuiAppBar: {
        defaultProps: { color: 'default', elevation: 0, position: 'sticky' },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.navbar,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(6px)',
            transition: 'all 0.3s ease',
          }),
        },
      },
      // ... rest of your component styles remain similar ...
    },
  });
};

// Default theme (light) - for backward compatibility
const defaultTheme = createCustomTheme('light');

export default defaultTheme;