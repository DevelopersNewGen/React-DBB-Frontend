import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
 
const MakeTransferForm = ({ onSubmit, loading, userAccounts = [] }) => {
  const [form, setForm] = useState({
    originAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });
 
  const isFormValid = form.originAccount && form.destinationAccount && parseFloat(form.amount) > 0;
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit(form);
      setForm({ originAccount: "", destinationAccount: "", amount: "", description: "" });
    }
  };
 
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 8,
        maxWidth: 460,
        mx: "auto",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#1976d2",
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <SwapHorizIcon sx={{ fontSize: 34, color: "#fff" }} />
        </Box>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Transferencia Bancaria
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
          label="Cuenta de origen"
          name="originAccount"
          value={form.originAccount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { fontSize: "1.1rem" },
          }}
        />
        <TextField
          label="Cuenta de destino"
          name="destinationAccount"
          value={form.destinationAccount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { fontSize: "1.1rem" },
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
          inputProps={{
            min: 0.01,
            step: 0.01,
            style: { fontSize: "1.1rem" },
          }}
        />
        <TextField
          label="Descripción (opcional)"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ style: { fontSize: "1.05rem" } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !isFormValid}
          sx={{ mt: 2, py: 1.4, fontSize: "1.05rem", fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Transferir"}
        </Button>
      </Box>
    </Paper>
  );
};
 
export default MakeTransferForm;