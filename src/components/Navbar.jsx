import React, { useState, Suspense } from 'react';
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
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const MiscellaneousServicesIcon = React.lazy(() => import('@mui/icons-material/MiscellaneousServices'));
const LogoutIcon = React.lazy(() => import('@mui/icons-material/Logout'));
const PaidIcon = React.lazy(() => import('@mui/icons-material/Paid'));
const AccountBalanceIcon = React.lazy(() => import('@mui/icons-material/AccountBalance'));
const SwapHorizIcon = React.lazy(() => import('@mui/icons-material/SwapHoriz'));
const ReceiptLongIcon = React.lazy(() => import('@mui/icons-material/ReceiptLong'));
const GroupIcon = React.lazy(() => import('@mui/icons-material/Group'));
const MonetizationOnIcon = React.lazy(() => import('@mui/icons-material/MonetizationOn'));

const Icon = ({ component: Component, ...props }) => (
  <Suspense fallback={<span style={{ width: 24 }} />}>
    <Component {...props} />
  </Suspense>
);

const pagesAdmin = [
  { name: 'movimientos', path: '/movimientos', icon: () => <Icon component={PaidIcon} sx={{ mr: 1 }} /> },
  { name: 'Cuentas', path: '/cuentas', icon: () => <Icon component={AccountBalanceIcon} sx={{ mr: 1 }} /> },
  { name: 'Servicios', path: '/servicios', icon: () => <Icon component={ReceiptLongIcon} sx={{ mr: 1 }} /> },
  { name: 'Clientes', path: '/clientes', icon: () => <Icon component={GroupIcon} sx={{ mr: 1 }} /> },
  { name: 'Depositar', path: '/depositar', icon: () => <Icon component={PaidIcon} sx={{ mr: 1 }} /> },
  { name: 'Retirar', path: '/retirar', icon: () => <Icon component={PaidIcon} sx={{ mr: 1 }} /> }
];

const pagesUser = [
  { name: 'Transferir', path: '/transferir', icon: () => <Icon component={SwapHorizIcon} sx={{ mr: 1 }} /> },
  { name: 'movimientos', path: '/movimientos', icon: () => <Icon component={PaidIcon} sx={{ mr: 1 }} /> },
  { name: 'Cuentas', path: '/cuentas', icon: () => <Icon component={AccountBalanceIcon} sx={{ mr: 1 }} /> },
  { name: 'Servicios', path: '/servicios', icon: () => <Icon component={ReceiptLongIcon} sx={{ mr: 1 }} /> },
];

const exchangePage = {
  name: 'Divisas',
  path: '/exchange',
  icon: () => <Icon component={MonetizationOnIcon} sx={{ mr: 1 }} />
};

const settings = [
  { icon: MiscellaneousServicesIcon, text: 'Perfil' },
  { icon: LogoutIcon, text: 'Cerrar sesion' }
];

export const ResponsiveAppBar = () => {
  const { user, role, isLoading } = useUser();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  const pages = role === 'ADMIN_ROLE' ? pagesAdmin : pagesUser;

  if (isLoading) return null;

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: '#1e1e1e', boxShadow: 'none', borderBottom: '1px solid #333' }}
    >
      <div className="navbar-toolbar flex items-center justify-between px-0 bg-blue-900 border-b border-blue-800 shadow-lg w-full h-16 md:h-20">
        <img src="/logo.png" alt="Logo" className="h-10 md:h-14 mr-2 md:mr-4 pl-3" />

        <div className="flex lg:hidden">
          <IconButton onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-blue-200 hover:text-white">
            <MenuIcon />
          </IconButton>
        </div>

        <div className="hidden lg:flex flex-1 flex-wrap items-center justify-start space-x-2 lg:space-x-4 ml-4">
          <Button
            onClick={() => handlePages(exchangePage.path)}
            className={`group flex items-center gap-2 text-blue-300 rounded-lg px-4 py-2 ${
              location.pathname === exchangePage.path ? 'bg-blue-800 text-blue-100' : ''
            }`}
          >
            {exchangePage.icon()}
            <span className="group-hover:text-white text-blue-100">{exchangePage.name.toUpperCase()}</span>
          </Button>
          {isLogged && pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => handlePages(page.path)}
              className={`group flex items-center gap-2 text-blue-200 rounded-lg px-4 py-2 ${
                location.pathname === page.path ? 'bg-blue-800 text-blue-100' : ''
              }`}
            >
              {page.icon()}
              <span className="group-hover:text-white text-blue-100">{page.name.toUpperCase()}</span>
            </Button>
          ))}
        </div>

        {isLogged ? (
          <Box className="hidden lg:flex items-center ml-auto gap-2 pl-3">
            <Typography className="text-blue-100 font-mono font-medium px-2 py-2">
              {user?.name}
            </Typography>
            <Tooltip title="Configuración">
              <IconButton onClick={handleOpenUserMenu} className="p-0 px-6">
                <Avatar src={img} className="bg-blue-200" />
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
              PaperProps={{ className: 'bg-blue-50' }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={() => handleCloseUserMenu(setting)} className="hover:bg-blue-100 transition">
                  <Typography className="flex items-center gap-2 text-blue-900 font-medium">
                    <Icon component={setting.icon} fontSize="small" />
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Box className="hidden lg:flex flex-grow-0 ml-auto">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/auth"
              className="text-blue-200 hover:text-white transition font-mono font-medium px-4 py-2"
            >
              Iniciar sesión
            </Typography>
          </Box>
        )}

        {mobileNavOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-900 z-50 flex flex-col items-center px-4 py-4 lg:hidden shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mb-4">
              <Button
                onClick={() => { handlePages(exchangePage.path); setMobileNavOpen(false); }}
                className={`group flex items-center justify-center gap-2 text-blue-200 rounded-lg w-full text-center py-2 ${
                  location.pathname === exchangePage.path ? 'bg-blue-800 text-blue-100' : ''
                }`}
              >
                {exchangePage.icon()}
                <span className="group-hover:text-white text-blue-200">{exchangePage.name.toUpperCase()}</span>
              </Button>
              {isLogged && pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => { handlePages(page.path); setMobileNavOpen(false); }}
                  className={`group flex items-center justify-center gap-2 text-blue-200 rounded-lg w-full text-center py-2 ${
                    location.pathname === page.path ? 'bg-blue-800 text-blue-100' : ''
                  }`}
                >
                  {page.icon()}
                  <span className="group-hover:text-white text-blue-200">{page.name.toUpperCase()}</span>
                </Button>
              ))}
            </div>
            {isLogged ? (
              <div className="flex flex-col items-center w-full mb-2 pl-3">
                <Avatar src={img} className="bg-blue-200 mb-2" />
                <span className="text-blue-100 font-mono font-medium px-4 py-2 mb-2">{user?.name}</span>
                <Button
                  onClick={() => { handleCloseUserMenu(settings[1]); setMobileNavOpen(false); }}
                  className="text-blue-200 hover:text-white rounded-lg px-4 py-2 w-2/3 mx-auto flex items-center justify-center"
                >
                  <Icon component={LogoutIcon} fontSize="small" />
                  <span className="ml-2">Cerrar sesión</span>
                </Button>
              </div>
            ) : (
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/auth"
                className="text-blue-200 hover:text-white transition font-mono font-medium mt-2 text-center w-full px-4 py-2"
              >
                Iniciar sesión
              </Typography>
            )}
          </div>
        )}
      </div>
    </AppBar>
  );
};
