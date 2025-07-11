import React, { useState } from "react";
import useMakeDeposit from "../../shared/hooks/useMakeDeposit";
import { useAdminAccounts } from "../../shared/hooks/useAdminAccounts";
import { TextField, Button, Typography, Box, CircularProgress, Autocomplete } from "@mui/material";

const MakeDepositForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const { deposit, loading, success, error } = useMakeDeposit();
  const { accounts, loading: isLoading } = useAdminAccounts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deposit({ destinationAccount, amount, description });
    setAmount("");
    setDescription("");
    setDestinationAccount("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "#fff" }}>
      <Typography variant="h5" mb={2}>Realizar Depósito</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Autocomplete
          id="destinationAccount"
          options={accounts}
          getOptionLabel={(acc) => acc ? `${acc.accountNumber} - ${acc.accountType}` : ""}
          value={accounts.find(acc => acc.accountNumber === destinationAccount) || null}
          onChange={(_, newValue) => setDestinationAccount(newValue ? newValue.accountNumber : "")}
          loading={isLoading}
          disabled={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cuenta destino"
              required
              margin="normal"
            />
          )}
        />
      </Box>

      <TextField
        label="Monto"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
        margin="normal"
        inputProps={{ min: 1 }}
      />

      <TextField
        label="Descripción"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || isLoading}>
        {loading ? <CircularProgress size={24} /> : "Depositar"}
      </Button>

      {success && <Typography mt={2} color="success.main">Depósito realizado con éxito.</Typography>}
      {error && (
        <Typography mt={2} color="error">
          {typeof error === "string"
            ? error
            : error?.message ||
              error?.response?.data?.msg ||
              "Error desconocido"}
        </Typography>
      )}
    </Box>
  );
};

export default MakeDepositForm;