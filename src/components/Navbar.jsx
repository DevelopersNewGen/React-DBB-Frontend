import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../shared/hooks'; 
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Container,
  Button
} from '@mui/material';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LogoutIcon from '@mui/icons-material/Logout';
import '../assets/navbar.css';

const pagesAdmin = ['Transferir','Pagos','Cuentas','Servicios','Clientes'];

const settings = [
  { icon: MiscellaneousServicesIcon, text: 'Perfil' },
  { icon: LogoutIcon, text: 'Cerrar sesion' }
];

export const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { user, role, isLoading } = useUser();
  const isLogged = !!user;
  const img = user?.img;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting.text) {
      case 'Perfil':
        navigate('/profile');
        break;
      case 'Cerrar sesion':
        localStorage.removeItem('user');
        window.location.href = '/';
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };
  
  const handlePages = (page) => {
    const routes = {
      Transferir: '/transferir',
      Pagos: '/pagos',
      Cuentas: '/cuentas',
      Servicios: '/servicios',
      Clientes: '/clientes',
    };
    if (routes[page]) {
      navigate(routes[page]);
    }
  };

  const pages =
    role === 'ADMIN_ROLE'
      ? pagesAdmin
      : [];

  if (isLoading) return null; // O un loader

  return (
    <AppBar position="fixed" className="navbar-appbar">
      <Container maxWidth="xl" className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar">
          <img src="vite.svg" alt="Logo" style={{ height: 40 }} className="navbar-logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="navbar-title desktop"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            
          </Typography>

          {isLogged ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePages(page)}
                    className="navbar-page-button"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                <Tooltip title="Configuración">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={img} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.text} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <setting.icon fontSize="small" />
                        {setting.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 0, ml: 'auto' }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/auth"
                className="navbar-login-link"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 400,
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Iniciar sesión
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};