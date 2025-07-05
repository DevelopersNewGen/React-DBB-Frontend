import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import { createAccount } from "../../services/api";
import { ResponsiveAppBar } from "../Navbar";

const CreateAccountForm = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountType: "",
    balance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        balance: parseFloat(formData.balance),
      };

      await createAccount(uid, dataToSend);

      alert("Cuenta creada exitosamente");
      navigate("/cuentas");
    } catch (error) {
      alert(error.response?.data?.msg || "Error al crear la cuenta");
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box mt={16} maxWidth={500} mx="auto">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Tipo de Cuenta"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="MONETARY">Monetaria</MenuItem>
            <MenuItem value="SAVER">Ahorro</MenuItem>
            <MenuItem value="OTHER">Otra</MenuItem>
          </TextField>
          <TextField
            label="Saldo Inicial"
            name="balance"
            type="number"
            value={formData.balance}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(-1)}
            >
              Regresar
            </Button>
            <Button type="submit" variant="contained" color="inherit">
              Crear Cuenta
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default CreateAccountForm;