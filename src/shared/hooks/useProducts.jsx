import { useState, useEffect } from 'react';
import { createProduct, getAllProducts } from '../../services/api.jsx';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [form, setForm] = useState({
        name: "",
        category: "Product",
        description: "",
        img: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [processingImage, setProcessingImage] = useState(false);

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

    const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.7) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                let { width, height } = img;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        
        if (!file) {
            setForm({ ...form, img: null });
            setImagePreview(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen es demasiado grande. Máximo 5MB.');
            return;
        }

        setProcessingImage(true);

        try {
            let processedFile = file;
            
            if (file.size > 500 * 1024) {
                processedFile = await compressImage(file);
            }

            setForm({ ...form, img: processedFile });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setProcessingImage(false);
            };
            reader.readAsDataURL(processedFile);

        } catch (error) {
            console.error('Error procesando imagen:', error);
            alert('Error al procesar la imagen');
            setProcessingImage(false);
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            category: "Product",
            description: "",
            img: null,
        });
        setImagePreview(null);
        setProcessingImage(false);
    };

    const handleCreateProduct = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            const formData = new FormData();
            formData.append("name", form.name.trim());
            formData.append("category", form.category);
            formData.append("description", form.description.trim());
            
            if (form.img) {
                formData.append("img", form.img)
            }

            const response = await createProduct(formData);
            
            if (response.error) {
                const errorMessage = response.e.response?.data?.errors || 
                                   response.e.response?.data?.message || 
                                   'Error al crear producto';
                setError(errorMessage);
                return false;
            } else {
                setSuccess('Producto creado exitosamente');
                setProducts((prevProducts) => [...prevProducts, response.data]); 
                
                resetForm();
                return response.data;
            }
        } catch (err) {
            setError('Error al crear producto');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeProductFromState = (productId) => {
        setProducts((prevProducts) => 
            prevProducts.filter(product => product._id !== productId)
        );
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
        loading,
        error,
        success,
        form,
        imagePreview,
        processingImage,
        handleCreateProduct,
        handleFormChange,
        handleFileChange,
        resetForm,
        resetMessages,
        fetchProducts,
        removeProductFromState
    };
};