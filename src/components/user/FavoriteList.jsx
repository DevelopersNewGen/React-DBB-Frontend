import React, { useState } from "react";
import { Button, Box, Typography, List, ListItem, ListItemText, TextField, Stack } from "@mui/material";

export const FavoriteList = ({ favorites, onAdd, loading }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [alias, setAlias] = useState("");

  const handleAdd = () => {
    if (accountNumber && alias) {
      onAdd({ accountNumber, alias });
      setAccountNumber("");
      setAlias("");
    }
  };

  if (loading) return <Typography>Cargando favoritos...</Typography>;

  return (
    <Box>
      {favorites.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" mb={2}>No tienes cuentas favoritas.</Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            <TextField
              label="No. de cuenta"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              size="small"
            />
            <TextField
              label="Alias"
              value={alias}
              onChange={e => setAlias(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={handleAdd}>Agregar favorito</Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" mb={2}>Tus cuentas favoritas</Typography>
          <List>
            {favorites.map((fav) => (
              <ListItem key={fav._id || fav.accountNumber}>
                <ListItemText
                  primary={fav.alias || fav.accountNumber}
                  secondary={fav.accountNumber}
                />
              </ListItem>
            ))}
          </List>
          <Box mt={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="No. de cuenta"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                size="small"
              />
              <TextField
                label="Alias"
                value={alias}
                onChange={e => setAlias(e.target.value)}
                size="small"
              />
              <Button variant="contained" onClick={handleAdd}>Agregar favorito</Button>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
