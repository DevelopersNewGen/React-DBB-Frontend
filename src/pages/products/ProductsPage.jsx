import React, { useState } from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { ProductAdd } from "../../components/products/ProductAdd.jsx";
import { ProductList } from "../../components/products/ProductList.jsx";
import { Box, Typography, Alert } from "@mui/material";
import { useProducts } from "../../shared/hooks/useProducts.jsx";
import { AgregarServiciosButton } from "../../components/products/AgregarServiciosButton.jsx";

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
        if (user.username && user.username.toLowerCase().includes('admin')) {
          return 'ADMIN_ROLE';
        }
        return 'USER_ROLE';
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
      <Box sx={{ padding: 3, marginTop: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" component="h1">
            Gestión de Productos
          </Typography>

          <AgregarServiciosButton role={role} onClick={() => setOpen(true)} />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={resetMessages}>
            {typeof error === "string" ? error : "Error al cargar productos"}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={resetMessages}>
            {success}
          </Alert>
        )}

        <ProductAdd onProductCreated={handleProductCreated} open={open} setOpen={setOpen} />

        <Box sx={{ mt: 4 }}>
          <ProductList products={products} loading={loading} />
        </Box>
      </Box>
    </>
  );
};