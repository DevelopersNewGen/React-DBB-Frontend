import React from 'react';
import { Card, CardMedia, Box, Typography } from '@mui/material';

export const ProductCard = ({ product }) => {
  const getImageUrl = (imgPath) => {
    if (!imgPath) return '/placeholder-image.png';
    if (imgPath.startsWith('http')) return imgPath;
    return `${process.env.REACT_APP_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/your-cloud-name/image/upload/'}${imgPath}`;
  };

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
      <Card
        sx={{
          height: 160,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image={getImageUrl(product.productImg)}
          alt={product.name}
          sx={{ height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = '/placeholder-image.png';
          }}
        />
      </Card>

      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          px: 2,
          py: 1,
          borderRadius: '999px',
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 13,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: 'none',
        }}
      >
        PROMOCIÓN
      </Box>

      <style>
        {`
          .MuiBox-root:hover .overlay {
            opacity: 1;
          }
        `}
      </style>
    </Box>
  );
};
