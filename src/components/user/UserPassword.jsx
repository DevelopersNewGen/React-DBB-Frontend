import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useUserPassword } from "../../shared/hooks/useUserPassword";
import { validatePassword } from "../../shared/validators/validatePassword";

export const UserPassword = ({ open, onClose }) => {
  const [contraActual, setContraActual] = useState("");
  const [nuevaContra, setNuevaContra] = useState("");
  const [confirmacionContra, setConfirmacionContra] = useState("");
  const { updateUserPassword, loading, error, success, setError, setSuccess } = useUserPassword();
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (nuevaContra !== confirmacionContra) {
      setLocalError("Las contraseñas nuevas no coinciden");
      return;
    }
    const passwordError = validatePassword(nuevaContra);
    if (passwordError) {
      setLocalError(passwordError);
      return;
    }

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
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Cambiar Contraseña</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {localError && <Alert severity="error" sx={{ mb: 2 }}>{localError}</Alert>}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};