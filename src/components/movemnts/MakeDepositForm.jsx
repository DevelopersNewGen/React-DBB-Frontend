import React, { useState } from "react";
import useMakeDeposit from "../../shared/hooks/useMakeDeposit";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";

const MakeDepositForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const { deposit, loading, success, error } = useMakeDeposit();
  const { accounts, loading: accountsLoading } = useUserAccounts();

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
        <label htmlFor="destinationAccount" style={{ marginBottom: 4, fontWeight: 500, color: "rgba(0, 0, 0, 0.87)" }}>Cuenta destino:</label>
        <select
          id="destinationAccount"
          value={destinationAccount}
          onChange={(e) => setDestinationAccount(e.target.value)}
          required
          disabled={accountsLoading}
          style={{
            padding: "10.5px 14px",
            fontSize: "1rem",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: 4,
            backgroundColor: "#fff",
            transition: "border-color 0.3s",
            outline: "none"
          }}
          onFocus={(e) => e.target.style.borderColor = "#1976d2"}
          onBlur={(e) => e.target.style.borderColor = "rgba(0, 0, 0, 0.23)"}
        >
          <option value="">Selecciona una cuenta</option>
          {accounts.map((acc) => (
            <option key={acc.accountNumber} value={acc.accountNumber}>
              {acc.accountNumber} - {acc.accountType}
            </option>
          ))}
        </select>
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
        required
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || accountsLoading}>
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
