import React, { useState } from "react";
import useMakeWithdrawal from "../../shared/hooks/useMakeWithdrawal";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const MakeWithdrawalForm = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { withdraw, loading, error, response } = useMakeWithdrawal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await withdraw({ accountNumber, amount, description });
    setAccountNumber("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-10 mx-auto my-6 w-full max-w-[2200px] flex flex-col items-center">
      <Typography
        variant="h5"
        align="center"
        className="text-blue-900 font-bold font-mono tracking-wide mb-6"
      >
        Realizar Retiro
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* NÚMERO DE CUENTA */}
        <TextField
          label="Número de Cuenta"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          inputProps={{ 
            inputMode: "text",
            style: { fontSize: "1.1rem" }
          }}
          fullWidth
        />

        {/* MONTO */}
        <TextField
          label="Monto"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          inputProps={{ min: 1 }}
          fullWidth
        />

        {/* DESCRIPCIÓN */}
        <TextField
          label="Descripción (opcional)"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
          className="md:col-span-2"
        />

        {/* BOTÓN */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Retirar"}
          </Button>
        </div>

        {/* MENSAJES */}
        {response && (
          <Typography className="text-green-700 text-sm text-center font-medium md:col-span-2">
            {response.msg} Nuevo saldo: {response.newBalance}
          </Typography>
        )}
        {error && (
          <Typography className="text-red-600 text-sm text-center font-medium md:col-span-2">
            {typeof error === "string"
              ? error
              : error?.message || "Ocurrió un error"}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default MakeWithdrawalForm;