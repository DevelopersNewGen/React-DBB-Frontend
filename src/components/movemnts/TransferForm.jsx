import React, { useState } from "react";
import {TextField, Button, Box, Typography, Paper, Modal, Fade,} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";

const TransferForm = ({ onSubmit, loading }) => {
  const { accounts } = useUserAccounts();
  const [form, setForm] = useState({
    originAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectOrigin = (accountNumber) => {
    setForm((prev) => ({ ...prev, originAccount: accountNumber }));
  };

  const isFormValid =
    form.originAccount &&
    form.destinationAccount &&
    parseFloat(form.amount) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const selected = accounts.find(
      (acc) => acc.accountNumber === form.originAccount
    );

    if (onSubmit && selected?.accountNumber) {
      onSubmit({ ...form, originAccount: selected.accountNumber });
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 5, fontWeight: "bold" }}>
      <Box sx={{ maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" mb={2}>
          Transferencia
        </Typography>
        <form onSubmit={handleSubmit}>
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
            TRANSFERIR
          </Button>
        </form>
      </Box>

      <Box sx={{ minWidth: 400 }}>
        <Typography variant="subtitle1" mb={2} fontWeight="bold">
          Selecciona la cuenta de origen:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {accounts.map((acc, idx) => {
            const isSelected = form.originAccount === acc.accountNumber;
            return (
              <Box key={idx}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ borderBottom: "2px solid black" }}
                >
                  CUENTA: {acc.accountType?.toUpperCase()}
                </Typography>
                <Paper
                  elevation={4}
                  onClick={() => handleSelectOrigin(acc.accountNumber)}
                  sx={{
                    mt: 1,
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                    border: isSelected ? "2px solid #1976d2" : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      borderBottom: "1px solid #fff",
                      pb: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">NO. CUENTA</Typography>
                    <Typography variant="body2">DISPONIBLE</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "monospace",
                    }}
                  >
                    <Typography variant="body1">
                      {acc.accountNumber}
                    </Typography>
                    <Typography variant="body1">
                      Q{Number(acc.balance).toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Modal animado con check */}
      <Modal open={showSuccessModal} closeAfterTransition>
        <Fade in={showSuccessModal}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "rgba(255,255,255,0.95)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <CheckCircleOutline sx={{ fontSize: 100, color: "green" }} />
            <Typography variant="h5" mt={2} fontWeight="bold">
              ¡Transferencia exitosa!
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default TransferForm;
