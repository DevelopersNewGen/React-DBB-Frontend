import React, { useState } from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { ProductAdd } from "../../components/products/ProductAdd.jsx";
import { ProductList } from "../../components/products/ProductList.jsx";
import { CategorySection } from "../../components/products/CategorySection.jsx";
import { Alert } from "@mui/material";
import { useProducts } from "../../shared/hooks";
import { AgregarServiciosButton } from "../../components/products/AgregarServiciosButton.jsx";
import "./ProductsPage.css";

export const ProductsPage = () => {
  const { products, loading, error, success, resetMessages } = useProducts();
  const [open, setOpen] = useState(false);

  const handleProductCreated = () => {
    setTimeout(() => {
      resetMessages();
    }, 3000);
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
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };

  const role = getUserRole();

  return (
    <>
      <ResponsiveAppBar />
      <div className="products-page-container">
        <div className="products-header">
          <h1 className="products-title">Gestión de Productos</h1>
          <AgregarServiciosButton role={role} onClick={() => setOpen(true)} />
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

        <ProductAdd
          onProductCreated={handleProductCreated}
          open={open}
          setOpen={setOpen}
        />

        <div className="products-grid">
          <ProductList products={products} loading={loading} />
        </div>
      </div>
    </>
  );
};