import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useUserPassword } from "../../shared/hooks/useUserPassword";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const UserPassword = ({ open, onClose }) => {
  const [contraActual, setContraActual] = useState("");
  const [nuevaContra, setNuevaContra] = useState("");
  const [confirmacionContra, setConfirmacionContra] = useState("");
  const { updateUserPassword, loading, error, success, setError, setSuccess } = useUserPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await updateUserPassword({ contraActual, nuevaContra, confirmacionContra });
    if (ok) {
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 1500);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    setContraActual("");
    setNuevaContra("");
    setConfirmacionContra("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2} fontWeight={700}>
          Cambiar Contraseña
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          label="Contraseña Actual"
          type="password"
          fullWidth
          required
          margin="normal"
          value={contraActual}
          onChange={e => setContraActual(e.target.value)}
        />
        <TextField
          label="Nueva Contraseña"
          type="password"
          fullWidth
          required
          margin="normal"
          value={nuevaContra}
          onChange={e => setNuevaContra(e.target.value)}
        />
        <TextField
          label="Confirmar Nueva Contraseña"
          type="password"
          fullWidth
          required
          margin="normal"
          value={confirmacionContra}
          onChange={e => setConfirmacionContra(e.target.value)}
        />
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={handleClose} color="secondary" variant="outlined" disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};