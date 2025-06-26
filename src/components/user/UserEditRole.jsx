import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

export const UserEditRole = ({ open, onClose, user, onSave, loading }) => {
  const [role, setRole] = useState(user?.role || "");

  useEffect(() => {
    setRole(user?.role || "");
  }, [user]);

  const handleSave = () => {
    if (role && user) {
      onSave(user.uid, role);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Rol"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="CLIENT_ROLE">CLIENT_ROLE</MenuItem>
            <MenuItem value="ADMIN_ROLE">ADMIN_ROLE</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading || !role}
          variant="contained"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};