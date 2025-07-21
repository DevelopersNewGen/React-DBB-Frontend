import React, { useState } from "react";
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
import { useUserCreate } from "../../shared/hooks";

export const UserAdd = ({ onUserCreated }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    dpi: "",
    address: "",
    cellphone: "",
    email: "",
    password: "",
    jobName: "",
    monthlyIncome: "",
    role: "CLIENT_ROLE",
  });

  const { handleCreateUser, loading, error, success } = useUserCreate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      username: "",
      dpi: "",
      address: "",
      cellphone: "",
      email: "",
      password: "",
      jobName: "",
      monthlyIncome: "",
      role: "CLIENT_ROLE",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, monthlyIncome: Number(form.monthlyIncome) };
    const result = await handleCreateUser(data);
    if (result && onUserCreated) {
      onUserCreated(result);
      handleClose();
    }
  };

  const darkGray = "#333";

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          float: "right",
          marginBottom: 16,
          backgroundColor: darkGray,
          color: "#fff",
        }}
        sx={{
          "&:hover": {
            backgroundColor: "#222",
          },
        }}
      >
        Crear Usuario
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { backgroundColor: "#f5f5f5" },
        }}
      >
        <DialogTitle sx={{ color: darkGray }}>Crear Usuario</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="user-add-form">
            <Grid container spacing={2} columns={12}>
              <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
                  label="Contraseña"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  type="password"
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
                {typeof error === "string" ? error : "Error al crear usuario"}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Usuario creado exitosamente
              </Alert>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
            form="user-add-form"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: darkGray,
              color: "#fff",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};