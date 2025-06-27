import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import { useFavorite } from "../../shared/hooks/useFavorite";
import { FavoriteList } from "../../components/user/FavoriteList";
import { ResponsiveAppBar } from "../../components/Navbar"; 

const FavoritePage = () => {
  const {
    favorites,
    loading,
    error,
    addFavorite,
  } = useFavorite();

  const handleAdd = ({ accountNumber, alias }) => {
    addFavorite({ accountNumber, alias });
  };

  return (
    <>
      <ResponsiveAppBar /> 
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 10, p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" mb={3} align="center">Cuentas Favoritas</Typography>
        {error && <Alert severity="error">{error.message || error.toString()}</Alert>}
        <FavoriteList
          favorites={favorites}
          onAdd={handleAdd}
          loading={loading}
        />
      </Box>
    </>
  );
};

export default FavoritePage;
