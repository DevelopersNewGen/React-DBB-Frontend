import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { ProductCard } from './ProductCard.jsx';

export const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 200 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 200,
          flexDirection: 'column'
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No hay productos disponibles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea tu primer producto usando el botón "Crear Producto"
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr',
        },
      }}
    >
      {products.map((product) => (
        <Box key={product.uid || product._id}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};
