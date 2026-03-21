import React, { useState } from 'react';
import { 
  ListItemButton, 
  ListItemText, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  Typography 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import menuConfig from '../../assets/configs/menuConfig';

export default function NavBarItems() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const MobileDrawer = () => (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Menu
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {menuConfig.sidebarData.map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerClose}
                  aria-current={active ? 'page' : undefined}
                  sx={(theme) => ({
                    borderRadius: 1,
                    mb: 0.5,
                    color: active ? theme.palette.primary.main : theme.palette.text.primary,
                    backgroundColor: active ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  })}
                >
                  <ListItemText 
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      {/* Mobile Menu Button with Hamburger/Close Icon */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
        <IconButton
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          className={`mobile-menu-btn ${drawerOpen ? 'open' : ''}`}
          sx={{
            color: 'text.primary',
            width: 40,
            height: 40,
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              left: 8,
              height: 2,
              width: 24,
              backgroundColor: 'currentColor',
              transition: 'all 0.3s ease',
            },
            '&::before': {
              top: 14,
            },
            '&::after': {
              bottom: 14,
            },
            '& .menu-icon-line': {
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              height: 2,
              width: 24,
              backgroundColor: 'currentColor',
              transition: 'all 0.3s ease',
            },
            // Close state (when menu is open)
            '&.open::before': {
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
            },
            '&.open::after': {
              bottom: '50%',
              transform: 'translateY(50%) rotate(-45deg)',
            },
            '&.open .menu-icon-line': {
              opacity: 0,
              transform: 'scale(0)',
            },
          }}
        >
          {/* Middle line - using a span instead of an icon */}
          <span className="menu-icon-line" />
        </IconButton>
      </Box>

      {/* Desktop Menu Items */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
        {menuConfig.sidebarData.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.id}
              component={Link}
              to={item.path}
              aria-current={active ? 'page' : undefined}
              disableRipple
              sx={(theme) => ({
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                alignItems: 'center',
                transition: 'all .15s ease',
                // Text colors: readable on light AppBar
                color: active ? theme.palette.text.primary : theme.palette.text.secondary,
                // Underline accent (active/hover)
                borderBottom: '3px solid transparent',
                '&:hover': {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.action.hover,
                  borderBottomColor: theme.palette.secondary.main,
                },
                ...(active && {
                  borderBottomColor: theme.palette.secondary.main,
                }),
              })}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: active ? 800 : 600,
                  color: 'inherit',
                }}
              />
            </ListItemButton>
          );
        })}
      </Box>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </>
  );
}