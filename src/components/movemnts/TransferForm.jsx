import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const DepositForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    accountNumber: "",
    amount: "",
    description: "",
  });

  const isFormValid =
    form.accountNumber &&
    parseFloat(form.amount) > 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit(form);
      setForm({ accountNumber: "", amount: "", description: "" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f7fb", // Fondo suave y moderno
      }}
    >
      {/* Formulario en primer plano */}
      <Paper
        elevation={12}
        sx={{
          minWidth: 380,
          maxWidth: 440,
          p: 5,
          borderRadius: 5,
          boxShadow: "0 8px 32px rgba(30,41,59,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(1.5px)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#1976d2",
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            boxShadow: 2,
          }}
        >
          <AttachMoneyIcon sx={{ fontSize: 38, color: "#fff" }} />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#1976d2",
            mb: 2,
            textShadow: "0 2px 6px #fff6",
            letterSpacing: "1px",
          }}
        >
          Depósito
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Cuenta destino"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              bgcolor: "#f5faff",
              borderRadius: 2,
              '& .MuiInputBase-input': { fontSize: "1.15rem" },
              '& label': { fontSize: "1.08rem" },
            }}
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
            sx={{
              bgcolor: "#f5faff",
              borderRadius: 2,
              '& .MuiInputBase-input': { fontSize: "1.15rem" },
              '& label': { fontSize: "1.08rem" },
            }}
          />
          <TextField
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              bgcolor: "#f5faff",
              borderRadius: 2,
              '& .MuiInputBase-input': { fontSize: "1.15rem" },
              '& label': { fontSize: "1.08rem" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !isFormValid}
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 2,
              fontWeight: "bold",
              boxShadow: 2,
              letterSpacing: "1px",
            }}
          >
            DEPOSITAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default DepositForm;