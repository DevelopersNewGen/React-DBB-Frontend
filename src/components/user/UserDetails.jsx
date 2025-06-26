import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../shared/hooks/useUser";
import { Box, Typography, Grid, Paper, Button, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import { UserPassword } from "./UserPassword";
import { UserEdit } from "./userEdit";

export const UserDetails = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [openPassword, setOpenPassword] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  if (isLoading) return <Typography variant="h6">Cargando...</Typography>;
  if (!user) return <Typography variant="h6">No hay datos de usuario.</Typography>;

  const showValue = (value) =>
    value === undefined || value === null || value === "" ? "Desconocido" : value;

  const Field = ({ label, value }) => (
    <Box sx={{ mb: 3, px: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#000",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#6c87b7",
          color: "#fff",
          px: 3,
          py: 1,
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "0.95rem",
          height: "48px",
          minWidth: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {value}
      </Paper>
    </Box>
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 6,
      }}
    >
      <Box
        sx={{
          width: 220,
          background: "#e4e6ea",
          borderRadius: 2,
          p: 2,
          mr: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "stretch",
          height: "fit-content",
          mt: 10,
          boxShadow: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#6c87b7",
            color: "#fff",
            fontWeight: 700,
            mb: 1,
            py: 2,
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": { background: "#4d5e85" },
            fontSize: "1.1rem",
          }}
          onClick={() => navigate("/profile")}
          fullWidth
          startIcon={<PersonIcon sx={{ fontSize: 40, color: "#5470a6" }} />}
        >
          MI INFO
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#333",
            fontWeight: 700,
            mb: 1,
            py: 2,
            borderRadius: 2,
            borderColor: "#b0b0b0",
            background: "#fff",
            "&:hover": { background: "#e0e0e0" },
            fontSize: "1.1rem",
          }}
          onClick={() => navigate("/favoritos")}
          fullWidth
          startIcon={<StarIcon sx={{ fontSize: 40, color: "#5470a6" }} />}
        >
          CUENTAS FAV
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#333",
            fontWeight: 700,
            py: 2,
            borderRadius: 2,
            borderColor: "#b0b0b0",
            background: "#fff",
            "&:hover": { background: "#e0e0e0" },
            fontSize: "1.1rem",
          }}
          onClick={handleLogout}
          fullWidth
          startIcon={<LogoutIcon sx={{ fontSize: 40, color: "#5470a6" }} />}
        >
          CERRAR SESIÓN
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          maxWidth: 1350,
          px: 6,
          py: 5,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          minWidth: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={4} align="center">
          Detalles del Usuario
        </Typography>

        <Grid container spacing={4} columns={12}>
          <Grid sx={{ pr: { md: 3 }, gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Field label="Usuario" value={showValue(user.username)} />
            <Field label="Nombres" value={showValue(user.name)} />
            <Field label="Correo" value={showValue(user.email)} />
            <Field label="DPI" value={showValue(user.dpi)} />
          </Grid>
          <Grid sx={{ px: { md: 3 }, gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Field label="Contraseña" value="************" />
            <Field label="Teléfono" value={showValue(user.cellphone)} />
            <Field label="Nombre de trabajo" value={showValue(user.jobName)} />
          </Grid>
          <Grid sx={{ pl: { md: 3 }, gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Field label="Dirección" value={showValue(user.address)} />
            <Field
              label="Ingresos mensuales"
              value={
                user.monthlyIncome === undefined ||
                user.monthlyIncome === null ||
                user.monthlyIncome === ""
                  ? "Desconocido"
                  : `Q ${Number(user.monthlyIncome).toLocaleString("es-GT", {
                      minimumFractionDigits: 2,
                    })}`
              }
            />
            <Field
              label="Estado"
              value={
                user.status === undefined || user.status === null
                  ? "Desconocido"
                  : user.status
                  ? "Activo"
                  : "Inactivo"
              }
            />
          </Grid>
        </Grid>

        <Stack
          spacing={2}
          direction="column"
          sx={{
            mt: 4,
            width: { xs: "100%", md: "50%" },
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#2c3550",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              "&:hover": { background: "#1e2233" },
              py: 1.5,
            }}
            onClick={() => setOpenEdit(true)}
            fullWidth
            startIcon={<EditIcon sx={{ fontSize: 34, color: "#5470a6" }} />}
          >
            EDITAR
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#6c87b7",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              "&:hover": { background: "#4d5e85" },
              py: 1.5,
            }}
            onClick={() => setOpenPassword(true)}
            fullWidth
            startIcon={<LockResetIcon sx={{ fontSize: 34, color: "#5470a6" }} />}
          >
            CAMBIAR CONTRASEÑA
          </Button>
        </Stack>
        <UserEdit open={openEdit} onClose={() => setOpenEdit(false)} user={user} />
        <UserPassword open={openPassword} onClose={() => setOpenPassword(false)} />
      </Box>
    </Box>
  );
};
