import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import PropTypes from "prop-types";
import { useLogin } from "../../shared/hooks"
import "../../assets/login.css"

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    emailOrUsername: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "emailOrUsername":
        isValid = value.length > 0;
        break;
      case "password":
        isValid = value.length > 0;
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (
      formState.emailOrUsername.isValid &&
      formState.password.isValid &&
      !isLoading
    ) {
      await login(formState.emailOrUsername.value, formState.password.value);
    }
  };

  const isSubmitDisabled =
    isLoading || !formState.emailOrUsername.isValid || !formState.password.isValid;

  return (
    <Box className="section-container">
      <Paper className="section-form" elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography className="section-title" variant="h5" mb={2} align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Correo electrónico"
            type="text"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            className="section-input"
            value={formState.emailOrUsername.value}
            onChange={e => handleInputValueChange(e.target.value, "emailOrUsername")}
            autoFocus
            onBlur={e => handleInputValidationOnBlur(e.target.value, "emailOrUsername")}
            error={formState.emailOrUsername.showError}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            margin="normal"
            className="section-input"
            value={formState.password.value}
            onChange={e => handleInputValueChange(e.target.value, "password")}
            onBlur={e => handleInputValidationOnBlur(e.target.value, "password")}
            error={formState.password.showError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="section-button"
            sx={{ mt: 2 }}
            disabled={isSubmitDisabled}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};