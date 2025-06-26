import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";

const TransferForm = ({ onSubmit, loading }) => {
  const { accounts } = useUserAccounts();

  const [form, setForm] = useState({
    originAccount: "", // contiene el accountNumber
    destinationAccount: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectOrigin = (accountNumber) => {
    setForm((prev) => ({ ...prev, originAccount: accountNumber }));
  };

  const isFormValid =
    form.originAccount &&
    form.destinationAccount &&
    form.amount > 0;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Transferencia
      </Typography>
      <Typography variant="subtitle1" mb={1}>
        Selecciona la cuenta de origen:
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
        {accounts.map((acc, idx) => {
          const isSelected = form.originAccount === acc.accountNumber;

          return (
            <Paper
              key={acc.accountNumber || `fallback-${idx}`}
              elevation={isSelected ? 6 : 1}
              sx={{
                p: 2,
                cursor: "pointer",
                border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
                background: isSelected ? "#e3f2fd" : "#fff",
                transition: "all 0.2s",
                position: "relative",
              }}
              onClick={() => handleSelectOrigin(acc.accountNumber)}
            >
              <Typography variant="body1" fontWeight={600}>
                {acc.accountNumber}
              </Typography>
              <Typography variant="body2">Q{acc.balance}</Typography>
              <Typography variant="caption" color="text.secondary">
                {acc.accountType}
              </Typography>
              {isSelected && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 12,
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  ✓ Seleccionada
                </Typography>
              )}
            </Paper>
          );
        })}
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isFormValid) return;

          const selected = accounts.find(
            (acc) => acc.accountNumber === form.originAccount
          );

          if (onSubmit && selected?.accountNumber) {
            // envia accountNumber en lugar de _id
            onSubmit({
              ...form,
              originAccount: selected.accountNumber,
            });
          }
        }}
      >
        <TextField
          label="Cuenta Destino (ID)"
          name="destinationAccount"
          value={form.destinationAccount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Monto"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !isFormValid}
          sx={{ mt: 2 }}
        >
          Transferir
        </Button>
      </form>
    </Box>
  );
};

export default TransferForm;
