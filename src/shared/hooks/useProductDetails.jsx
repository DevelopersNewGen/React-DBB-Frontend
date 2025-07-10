import { useState, useEffect } from 'react';
import { getProductById } from '../../services/api';

export const useProductDetails = (productId, open) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async () => {
    if (!productId) return;
    
    setLoading(true);
    try {
      const response = await getProductById(productId);
      
      if (!response.error) {
        setProductDetails(response.data);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && productId) {
      fetchProductDetails();
    }
  }, [open, productId]);

  const clearProductDetails = () => {
    setProductDetails(null);
  };

  return {
    productDetails,
    loading,
    clearProductDetails,
    refetch: fetchProductDetails
  };
};