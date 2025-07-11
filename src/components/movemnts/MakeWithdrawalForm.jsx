import React, { useState } from "react";
import useMakeWithdrawal from "../../shared/hooks/useMakeWithdrawal";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const MakeWithdrawalForm = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { withdraw, loading, error, response } = useMakeWithdrawal();

  const handleSubmit = (e) => {
    e.preventDefault();
    withdraw({ accountNumber, amount, description });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 8, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Realizar Retiro
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Número de Cuenta"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          label="Monto"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          inputProps={{ min: 0.01, step: 0.01 }}
        />
        <TextField
          label="Descripción (opcional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Procesando..." : "Retirar"}
        </Button>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {response && (
          <Typography color="success.main" align="center" sx={{ mt: 2 }}>
            {response.msg} Nuevo saldo: {response.newBalance}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default MakeWithdrawalForm;