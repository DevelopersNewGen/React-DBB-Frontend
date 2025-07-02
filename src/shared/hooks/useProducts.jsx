import { useState, useEffect } from 'react';
import { createProduct, getAllProducts } from '../../services/api.jsx';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getAllProducts();
            
            if (response.error) {
                const errorMessage = response.e.response?.data?.message || 'Error al cargar productos';
                setError(errorMessage);
            } else {
                setProducts(response.data || []);
            }
        } catch (err) {
            setError('Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProduct = async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            const response = await createProduct(formData);
            
            if (response.error) {
                const errorMessage = response.e.response?.data?.errors || 
                                   response.e.response?.data?.message || 
                                   'Error al crear producto';
                setError(errorMessage);
                return false;
            } else {
                setSuccess('Producto creado exitosamente');
                await fetchProducts();
                return response.data;
            }
        } catch (err) {
            setError('Error al crear producto');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetMessages = () => {
        setError(null);
        setSuccess(null);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        handleCreateProduct,
        loading,
        error,
        success,
        setError,
        setSuccess,
        resetMessages,
        fetchProducts
    };
};