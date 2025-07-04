import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
} from "@mui/material";
import { useExchange } from "../../shared/hooks/useExchanges";
import "../../assets/exchange.css"
const currencyOptions = [
  { code: "USD", label: "USD - Dólar estadounidense" },
  { code: "GTQ", label: "GTQ - Quetzal" },
];

export const ExchangeCalculator = () => {
  const [operation, setOperation] = useState("compra");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GTQ");
  const [amount, setAmount] = useState(80);

  const {
    conversionRate,
    conversionAmount,
    netAmount,
    isLoading,
    error,
    convert,
  } = useExchange();

  useEffect(() => {
    if (operation === "compra") {
      setFromCurrency("USD");
      setToCurrency("GTQ");
    } else {
      setFromCurrency("GTQ");
      setToCurrency("USD");
    }
  }, [operation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    convert({ from: fromCurrency, to: toCurrency, amount });
  };

  return (
    <Box className="exchange-container">
      <Box className="exchange-header">
        <Box className="exchange-rate-box">
          <Typography className="exchange-rate-title">Bi Compra</Typography>
          <Typography>Tengo USD y banco me da GTQ</Typography>
          <Typography className="exchange-rate-value">1 USD = 7.49 GTQ</Typography>
        </Box>
        <Box className="exchange-rate-box">
          <Typography className="exchange-rate-title">Bi Vende</Typography>
          <Typography>Tengo GTQ y banco me da USD</Typography>
          <Typography className="exchange-rate-value">1 USD = 7.83 GTQ</Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Calcular
      </Typography>

      <ToggleButtonGroup
        value={operation}
        exclusive
        onChange={(_, val) => val && setOperation(val)}
        className="toggle-group"
      >
        <ToggleButton value="compra" className="toggle-button">
          Bi Compra
        </ToggleButton>
        <ToggleButton value="vende" className="toggle-button">
          Bi Vende
        </ToggleButton>
      </ToggleButtonGroup>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Monto"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="amount-input"
            />
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth className="currency-select">
              <InputLabel>De</InputLabel>
              <Select
                value={fromCurrency}
                label="De"
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyOptions.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2} textAlign="center" display="flex" alignItems="center">
            <Typography>⇄</Typography>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth className="currency-select">
              <InputLabel>A</InputLabel>
              <Select
                value={toCurrency}
                label="A"
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyOptions.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              className="calculate-button"
            >
              {isLoading ? "Calculando…" : "Calcular"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {conversionRate != null && (
        <Box className="result-box">
          <Typography className="result-title">Resultado:</Typography>
          <Typography className="result-value">
            {amount} {fromCurrency} = {netAmount.toFixed(2)} {toCurrency}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
