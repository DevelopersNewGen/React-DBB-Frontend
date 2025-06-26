import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem } from "@mui/material";
import { createAccount } from "../../services/api";

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

      console.log("Datos enviados al backend:", dataToSend);

      await createAccount(uid, dataToSend);

      alert("Cuenta creada exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error al crear la cuenta:", error.response?.data || error);
      alert(error.response?.data?.msg || "Error al crear la cuenta");
    }
  };

  return (
    <div>
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
        <Button type="submit" variant="contained" color="primary">
          Crear Cuenta
        </Button>
      </form>
    </div>
  );
};

export default CreateAccountForm;