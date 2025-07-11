import React, { useState } from "react";
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
import "../../assets/exchange.css";

const currencyOptions = [
  { code: "USD", label: "USD - Dólar estadounidense" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - Libra esterlina" },
  { code: "GTQ", label: "GTQ - Quetzal" },
];

export const ExchangeCalculator = () => {
  const [operation, setOperation] = useState("compra");
  const [amount, setAmount] = useState("");
  const [fromCurrencySelected, setFromCurrencySelected] = useState("USD");
  const [toCurrencySelected, setToCurrencySelected] = useState("USD");
  const [lastCalculation, setLastCalculation] = useState(null);
  const fromCurrency = operation === "compra" ? fromCurrencySelected : "GTQ";
  const toCurrency = operation === "compra" ? "GTQ" : toCurrencySelected;

  const {
    conversionRate,
    netAmount,
    isLoading,
    error,
    convert,
  } = useExchange();

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }
    const calculationData = {
      operation,
      fromCurrency,
      toCurrency,
      amount: numericAmount
    };
    setLastCalculation(calculationData);
    
    convert({ 
      from: fromCurrency, 
      to: toCurrency, 
      amount: numericAmount,
      operation
    });
  };

  return (
    <Box className="exchange-container">
      <Box className="exchange-header">
        <Box className="exchange-rate-box">
          <Typography className="exchange-rate-title">DBB Compra</Typography>
          <Typography>Tengo USD, EUR o GBP y banco me da GTQ</Typography>
          <Typography className="exchange-rate-value">1 USD = 7.46 GTQ</Typography>
          <Typography className="exchange-rate-value">1 EUR = 8.79 GTQ</Typography>
          <Typography className="exchange-rate-value">1 GBP = 10.18 GTQ</Typography>
        </Box>
        <Box className="exchange-rate-box">
          <Typography className="exchange-rate-title">DBB Vende</Typography>
          <Typography>Tengo GTQ y banco me da USD, EUR o GBP</Typography>
          <Typography className="exchange-rate-value">1 GTQ = 0.13 USD</Typography>
          <Typography className="exchange-rate-value">1 GTQ = 0.11 EUR</Typography>
          <Typography className="exchange-rate-value">1 GTQ = 0.09 GBP</Typography>
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
          DBB Compra
        </ToggleButton>
        <ToggleButton value="vende" className="toggle-button">
          DBB Vende
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
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
              required
            />
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth className="currency-select">
              <InputLabel>De</InputLabel>
              <Select
                value={fromCurrency}
                label="De"
                disabled={operation === "vende"}
                onChange={(e) => operation === "compra" && setFromCurrencySelected(e.target.value)}
              >
                {operation === "compra" ? (
                  currencyOptions.filter(opt => opt.code !== "GTQ").map(option => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={fromCurrency}>
                    {currencyOptions.find(opt => opt.code === fromCurrency)?.label}
                  </MenuItem>
                )}
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
                disabled={operation === "compra"}
                onChange={(e) => operation === "vende" && setToCurrencySelected(e.target.value)}
              >
                {operation === "vende" ? (
                  currencyOptions.filter(opt => opt.code !== "GTQ").map(option => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={toCurrency}>
                    {currencyOptions.find(opt => opt.code === toCurrency)?.label}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className="calculate-button"
              fullWidth
            >
              {isLoading ? "Calculando…" : "Calcular"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {conversionRate !== null && netAmount !== null && lastCalculation && (
        <Box className="result-box" mt={3}>
          <Typography className="result-title">Resultado:</Typography>
          <Typography className="result-value">
            {lastCalculation.amount} {lastCalculation.fromCurrency} = {netAmount.toFixed(2)} {lastCalculation.toCurrency}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Typography 
        variant="body2" 
        color="text.secondary" 
        mt={3} 
        textAlign="center"
        sx={{ fontStyle: 'italic' }}
      >
        * Tenemos una comisión del 3% por cada cambio de divisa
      </Typography>
    </Box>
  );
};
