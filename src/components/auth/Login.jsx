import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import Link from '@mui/joy/Link';
import PropTypes from "prop-types";
import {
  validateEmail,
  validateEmailMessage,
} from "../../shared/validators/validateEmail.jsx";
import { useLogin } from "../../shared/hooks"

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    email: {
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
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = true;
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

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmitDisabled =
    isLoading || !formState.email.isValid || !formState.password.isValid;

  return (
    <Box className="section-container">
      <video className="section-bg" autoPlay loop muted>
        <source src="https://res.cloudinary.com/daherc5uz/video/upload/v1748216098/ywxwfilf1ajkt1eiiiw7.mp4" type="video/mp4" />
      </video>

      <Paper className="section-form" elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography className="section-title" variant="h5" mb={2} align="center">
          Iniciar Sesión
        </Typography>
        <form >
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            className="section-input"
            value={formState.email.value}
            onChange={e => handleInputValueChange(e.target.value, "email")}
            autoFocus
            helperText={validateEmailMessage}
            onBlur={e => handleInputValidationOnBlur(e.target.value, "email")}
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="section-button"
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={isSubmitDisabled}
          >
            Entrar
          </Button>
        </form>
        <Link
          color="primary"
          disabled={false}
          underline="always"
          variant="plain"
          className="section-link"
          onClick={switchAuthHandler}
          sx={{ display: "block", mt: 2, textAlign: "center" }}
        >
          Registrate
        </Link>
      </Paper>
    </Box>
  );
};

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};