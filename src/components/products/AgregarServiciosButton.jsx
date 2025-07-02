import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AgregarServiciosButton = ({ role, onClick }) => {
  const [hovered, setHovered] = useState(false);


  if (!role || (role !== 'ADMIN_ROLE' && role !== 'admin' && role !== 'ADMIN')) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        mb: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            mr: 1,
            transition: 'all 0.3s ease-in-out',
            whiteSpace: 'nowrap',
          }}
        >
          AGREGAR SERVICIOS
        </Typography>
      )}
      <IconButton sx={{ bgcolor: '#000', color: '#fff' }}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};