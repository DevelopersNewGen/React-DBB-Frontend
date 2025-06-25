import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { useUserUpdateAdmin } from "../../shared/hooks";

export const UserEditAdmin = ({ open, onClose, user, onUserUpdated }) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    dpi: "",
    address: "",
    cellphone: "",
    email: "",
    jobName: "",
    monthlyIncome: "",
    role: "",
  });

  const { handleUpdateUserAdmin, loading, error, success } = useUserUpdateAdmin();

 
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        dpi: user.dpi || "",
        address: user.address || "",
        cellphone: user.cellphone || "",
        email: user.email || "",
        jobName: user.jobName || "",
        monthlyIncome: user.monthlyIncome || "",
        role: user.role || "",
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, monthlyIncome: Number(form.monthlyIncome) };
    const result = await handleUpdateUserAdmin(user.uid, data);
    if (result && onUserUpdated) {
      onUserUpdated(result);
      onClose();
    }
  };

  const darkGray = "#333";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { backgroundColor: "#f5f5f5" },
      }}
    >
      <DialogTitle sx={{ color: darkGray }}>Editar Usuario</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="user-edit-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Usuario"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="DPI"
                name="dpi"
                value={form.dpi}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                name="cellphone"
                value={form.cellphone}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Puesto"
                name="jobName"
                value={form.jobName}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ingreso Mensual"
                name="monthlyIncome"
                value={form.monthlyIncome}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                InputLabelProps={{ style: { color: darkGray } }}
                InputProps={{ style: { color: darkGray } }}
              />
            </Grid>
          </Grid>
          {error && Array.isArray(error) ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {error.map((err, idx) => (
                  <li key={idx}>{err.msg}</li>
                ))}
              </ul>
            </Alert>
          ) : error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {typeof error === "string" ? error : "Error al actualizar usuario"}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Usuario actualizado exitosamente
            </Alert>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            backgroundColor: darkGray,
            color: "#fff",
            "&:hover": { backgroundColor: "#222" },
          }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="user-edit-form"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: darkGray,
            color: "#fff",
            "&:hover": { backgroundColor: "#222" },
          }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};