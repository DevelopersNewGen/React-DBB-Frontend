import React from 'react';
import { CircularProgress } from '@mui/material';
import { ProductCard } from './ProductCard.jsx';

export const ProductList = ({ products, loading, onProductClick }) => {
  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center min-h-screen">
        <CircularProgress />
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
