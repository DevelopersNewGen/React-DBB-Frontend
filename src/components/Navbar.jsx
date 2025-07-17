import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import '../assets/navbar.css';

const pagesAdmin = [
  { name: 'movimientos', path: '/movimientos', icon: <PaidIcon sx={{ mr: 1 }} /> },
  { name: 'Cuentas', path: '/cuentas', icon: <AccountBalanceIcon sx={{ mr: 1 }} /> },
  { name: 'Servicios', path: '/servicios', icon: <ReceiptLongIcon sx={{ mr: 1 }} /> },
  { name: 'Clientes', path: '/clientes', icon: <GroupIcon sx={{ mr: 1 }} /> },
  { name: 'Depositar', path: '/depositar', icon: <PaidIcon sx={{ mr: 1 }} /> },
  { name: 'Retirar', path: '/retirar', icon: <PaidIcon sx={{ mr: 1 }} /> }
];

const pagesUser = [
  { name: 'Transferir', path: '/transferir', icon: <SwapHorizIcon sx={{ mr: 1 }} /> },
  { name: 'movimientos', path: '/movimientos', icon: <PaidIcon sx={{ mr: 1 }} /> },
  { name: 'Cuentas', path: '/cuentas', icon: <AccountBalanceIcon sx={{ mr: 1 }} /> },
  { name: 'Servicios', path: '/servicios', icon: <ReceiptLongIcon sx={{ mr: 1 }} /> },
  { name: 'Divisas', path: '/exchange', icon: <MonetizationOnIcon sx={{ mr: 1 }} /> },

];

const exchangePage = { 
  name: 'Divisas', 
  path: '/exchange', 
  icon: <MonetizationOnIcon sx={{ mr: 1 }} /> 
};

const settings = [
  { icon: MiscellaneousServicesIcon, text: 'Perfil' },
  { icon: LogoutIcon, text: 'Cerrar sesion' }
];

export const ResponsiveAppBar = () => {
  const { user, role, isLoading, getUser } = useUser(); 
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
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

  const handlePages = (path) => {
    navigate(path);
  };

  const pages =
    role === 'ADMIN_ROLE'
      ? pagesAdmin
      : pagesUser;

  if (isLoading) return null; 

  return (
    <AppBar
      position="fixed"
      className="navbar-appbar"
      style={{ backgroundColor: '#1e1e1e', boxShadow: 'none', borderBottom: '1px solid #333' }}
    >
      <Container maxWidth={false} className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar">
          
          <img src="/logo.png" alt="Logo" style={{ height: 100, marginRight: 24 }} className="navbar-logo" />

          <Button
            onClick={() => handlePages(exchangePage.path)}
            className={`navbar-page-button${location.pathname === exchangePage.path ? ' active' : ''}`}
            sx={{ my: 2, color: 'white', display: 'block', alignItems: 'center' }}
            startIcon={exchangePage.icon}
          >
            {exchangePage.name.toUpperCase()}
          </Button>

          {isLogged && (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handlePages(page.path)}
                  className={`navbar-page-button${location.pathname === page.path ? ' active' : ''}`}
                  sx={{ my: 2, color: 'white', display: 'block', alignItems: 'center' }}
                  startIcon={page.icon}
                >
                  {page.name.toUpperCase()}
                </Button>
              ))}
            </Box>
          )}

          {isLogged ? (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <Typography
                sx={{
                  color: '#fff', 
                  fontWeight: 600,
                  marginRight: 2,
                  fontFamily: 'monospace',
                  letterSpacing: '.05rem'
                }}
              >
                {user?.name}
              </Typography>
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