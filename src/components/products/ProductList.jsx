import React from 'react';
import { CircularProgress } from '@mui/material';
import { ProductCard } from './ProductCard.jsx';

export const ProductList = ({ products, loading, onProductClick }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products-container">
        <h2 className="no-products-title">No hay productos disponibles</h2>
        <p className="no-products-subtitle">
          Crea tu primer producto usando el botón "Crear Producto"
        </p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.uid || product._id}>
          <ProductCard 
            product={product} 
            onProductClick={onProductClick}
          />
        </div>
      ))}
    </>
  );
};