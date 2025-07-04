import React, { useState, useEffect } from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { ProductAdd } from "../../components/products/ProductAdd.jsx";
import { ProductList } from "../../components/products/ProductList.jsx";
import { CategorySection } from "../../components/products/CategorySection.jsx";
import { ProductDetailsModal } from "../../components/products/ProductDetailsModal.jsx";
import { Alert } from "@mui/material";
import { useProducts } from "../../shared/hooks";
import { AgregarServiciosButton } from "../../components/products/AgregarServiciosButton.jsx";
import "./ProductsPage.css";

export const ProductsPage = () => {
  const { 
    products, 
    loading, 
    error, 
    success, 
    resetMessages, 
    fetchProducts,
    removeProductFromState
  } = useProducts();
  
  const [open, setOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductCreated = (newProduct) => {
    setTimeout(() => {
      resetMessages();
    }, 3000);
    fetchProducts();
  };

  const handleProductDeleted = (deletedProductId) => {
    removeProductFromState(deletedProductId);
  };

  const handleOpenDetails = (productId) => {
    setSelectedProductId(productId);
    setDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedProductId(null);
  };

  const getUserRole = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.username && user.username.toLowerCase().includes("admin")) {
          return "ADMIN_ROLE";
        }
        return "USER_ROLE";
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const role = getUserRole();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="products-page-container">
        <div className="products-header">
          <h1 className="products-title">Gestión de Productos</h1>
        </div>

        {error && (
          <div className="alert-container">
            <Alert severity="error" onClose={resetMessages}>
              {typeof error === "string" ? error : "Error al cargar productos"}
            </Alert>
          </div>
        )}

        {success && (
          <div className="alert-container">
            <Alert severity="success" onClose={resetMessages}>
              {success}
            </Alert>
          </div>
        )}

        <CategorySection />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <AgregarServiciosButton role={role} onClick={() => setOpen(true)} />
        </div>

        <ProductAdd
          onProductCreated={handleProductCreated}  
          open={open}
          setOpen={setOpen}
        />

        <div className="products-grid">
          <ProductList 
            products={products} 
            loading={loading} 
            onProductClick={handleOpenDetails}
          />
        </div>

        <ProductDetailsModal
          open={detailsModalOpen}
          onClose={handleCloseDetails}
          productId={selectedProductId}
          onProductDeleted={handleProductDeleted}
        />
      </div>
    </>
  );
};