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
  Backdrop,
  Box,
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

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          float: "right",
          mb: 2,
          background: "linear-gradient(145deg, #364159, #99acff)",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(153,172,255,0.6)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(145deg, #99acff, #364159)",
            boxShadow: "0 6px 16px rgba(153,172,255,0.8)",
            transform: "translateY(-2px)",
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
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(54,65,89,0.3)", // azul semitransparente
            },
          },
        }}
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            borderRadius: 3,
            p: 3,
            boxShadow: "0 8px 32px rgba(54,65,89,0.15)", // sombra azul
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#364159",
            mb: 2,
            textAlign: "center",
          }}
        >
          Crear Usuario
        </DialogTitle>

        <DialogContent>
          <Box component="form" id="user-add-form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                ["name", "Nombre"],
                ["username", "Usuario"],
                ["dpi", "DPI"],
                ["address", "Dirección"],
                ["cellphone", "Teléfono"],
                ["email", "Email", "email"],
                ["password", "Contraseña", "password"],
                ["jobName", "Puesto"],
                ["monthlyIncome", "Ingreso Mensual", "number"],
              ].map(([name, label, type = "text"]) => (
                <Grid key={name} item xs={12} sm={6}>
                  <TextField
                    label={label}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      sx: {
                        color: "#364159",
                        fontWeight: "600",
                        letterSpacing: "0.05em",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "#99acff",
                        fontWeight: "500",
                        backgroundColor: "rgba(153,172,255,0.15)",
                        borderRadius: 1,
                      },
                    }}
                  />
                </Grid>
              ))}
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
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{
              background: "linear-gradient(145deg, #364159, #99acff)",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(153,172,255,0.5)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(145deg, #99acff, #364159)",
                boxShadow: "0 6px 16px rgba(153,172,255,0.8)",
              },
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
              background: "linear-gradient(145deg, #364159, #99acff)",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.3,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {

                transform: "translateY(-2px)",
              },
            }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
