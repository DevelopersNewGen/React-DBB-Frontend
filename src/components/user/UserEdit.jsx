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
import { useUserUpdate } from "../../shared/hooks";

export const UserEdit = ({ open, onClose, user, onUserUpdated }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    cellphone: "",
    jobName: "",
    monthlyIncome: "",
  });

  const { handleUpdateUser, loading, error, success } = useUserUpdate();

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        address: user.address || "",
        cellphone: user.cellphone || "",
        jobName: user.jobName || "",
        monthlyIncome: user.monthlyIncome || "",
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, monthlyIncome: Number(form.monthlyIncome) };
    const result = await handleUpdateUser(data);
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
      <DialogTitle sx={{ color: darkGray }}>Editar Mi Perfil</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="user-edit-form">
          <Grid container spacing={2} columns={12}>
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
          {error && (
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