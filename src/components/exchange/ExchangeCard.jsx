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
  Paper,
  Divider,
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

  const { conversionRate, netAmount, isLoading, error, convert } = useExchange();

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const calculationData = {
      operation,
      fromCurrency,
      toCurrency,
      amount: numericAmount
    };
    setLastCalculation(calculationData);

    convert({ from: fromCurrency, to: toCurrency, amount: numericAmount, operation });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 720,
          width: "100%",
          mx: 2,
          py: 5,
          px: 4,
          borderRadius: 5,
          boxShadow: "0 8px 32px rgba(30,41,59,0.17)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={2}
          color="#1976d2"
          sx={{ letterSpacing: "1px" }}
        >
          Calculadora de Divisas
        </Typography>

        {/* Rates Panel */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2,
              minWidth: 170,
              borderRadius: 3,
              bgcolor: "#e3f2fd",
              boxShadow: "0 6px 16px rgba(25,118,210,0.07)",
            }}
          >
            <Typography fontWeight="bold" color="#1976d2">DBB Compra</Typography>
            <Typography variant="body2" mb={1}>Tengo USD/EUR/GBP y banco me da GTQ</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ fontSize: "1rem" }}>1 USD = 7.46 GTQ</Typography>
            <Typography sx={{ fontSize: "1rem" }}>1 EUR = 8.79 GTQ</Typography>
            <Typography sx={{ fontSize: "1rem" }}>1 GBP = 10.18 GTQ</Typography>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              minWidth: 170,
              borderRadius: 3,
              bgcolor: "#fce4ec",
              boxShadow: "0 6px 16px rgba(233,30,99,0.07)",
            }}
          >
            <Typography fontWeight="bold" color="#d81b60">DBB Vende</Typography>
            <Typography variant="body2" mb={1}>Tengo GTQ y banco me da USD/EUR/GBP</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ fontSize: "1rem" }}>1 GTQ = 0.13 USD</Typography>
            <Typography sx={{ fontSize: "1rem" }}>1 GTQ = 0.11 EUR</Typography>
            <Typography sx={{ fontSize: "1rem" }}>1 GTQ = 0.09 GBP</Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          textAlign="center"
          mb={2}
          color="#1976d2"
        >
          Calcular tu cambio
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <ToggleButtonGroup
            value={operation}
            exclusive
            onChange={(_, val) => val && setOperation(val)}
            sx={{
              bgcolor: "#f5faff",
              borderRadius: 2,
              boxShadow: "0 2px 8px #1976d233",
              gap: 2,
              mb: 2,
            }}
          >
            <ToggleButton
              value="compra"
              sx={{
                px: 4,
                py: 1,
                fontWeight: "bold",
                fontSize: "1rem",
                color: operation === "compra" ? "#fff" : "#1976d2",
                bgcolor: operation === "compra" ? "#1976d2" : "#e3f2fd",
                borderRadius: 2,
                transition: "all 0.2s",
                boxShadow: operation === "compra" ? 3 : 0,
                "&:hover": { bgcolor: "#1976d2", color: "#fff" },
              }}
            >
              DBB Compra
            </ToggleButton>
            <ToggleButton
              value="vende"
              sx={{
                px: 4,
                py: 1,
                fontWeight: "bold",
                fontSize: "1rem",
                color: operation === "vende" ? "#fff" : "#d81b60",
                bgcolor: operation === "vende" ? "#d81b60" : "#fce4ec",
                borderRadius: 2,
                transition: "all 0.2s",
                boxShadow: operation === "vende" ? 3 : 0,
                "&:hover": { bgcolor: "#d81b60", color: "#fff" },
              }}
            >
              DBB Vende
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Horizontal Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={4}>
              <TextField
                label="Monto"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                sx={{
                  bgcolor: "#f5faff",
                  borderRadius: 2,
                  '& .MuiInputBase-input': { fontSize: "1.1rem" },
                  '& label': { fontSize: "1rem" },
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>De</InputLabel>
                <Select
                  value={fromCurrency}
                  label="De"
                  disabled={operation === "vende"}
                  onChange={(e) => operation === "compra" && setFromCurrencySelected(e.target.value)}
                  sx={{ bgcolor: "#f5faff", borderRadius: 2 }}
                >
                  {operation === "compra"
                    ? currencyOptions.filter(opt => opt.code !== "GTQ").map(option => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.label}
                        </MenuItem>
                      ))
                    : <MenuItem value={fromCurrency}>
                        {currencyOptions.find(opt => opt.code === fromCurrency)?.label}
                      </MenuItem>}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "2rem" }}>⇄</Typography>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>A</InputLabel>
                <Select
                  value={toCurrency}
                  label="A"
                  disabled={operation === "compra"}
                  onChange={(e) => operation === "vende" && setToCurrencySelected(e.target.value)}
                  sx={{ bgcolor: "#f5faff", borderRadius: 2 }}
                >
                  {operation === "vende"
                    ? currencyOptions.filter(opt => opt.code !== "GTQ").map(option => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.label}
                        </MenuItem>
                      ))
                    : <MenuItem value={toCurrency}>
                        {currencyOptions.find(opt => opt.code === toCurrency)?.label}
                      </MenuItem>}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                fullWidth
                sx={{
                  py: 2,
                  fontSize: "1.15rem",
                  borderRadius: 2,
                  fontWeight: "bold",
                  boxShadow: 2,
                  letterSpacing: "1px",
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                {isLoading ? "Calculando…" : "Calcular"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Result */}
        {conversionRate !== null && netAmount !== null && lastCalculation && (
          <Paper
            elevation={4}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              bgcolor: "#e3f2fd",
              textAlign: "center",
              boxShadow: "0 4px 12px #1976d244",
            }}
            className="result-box"
          >
            <Typography className="result-title" fontWeight="bold" color="#1976d2" mb={1}>
              Resultado:
            </Typography>
            <Typography
              className="result-value"
              fontSize="1.6rem"
              fontWeight="bold"
              color="#1976d2"
            >
              {lastCalculation.amount} {lastCalculation.fromCurrency} = {netAmount.toFixed(2)} {lastCalculation.toCurrency}
            </Typography>
          </Paper>
        )}

        {error && (
          <Typography color="error" mt={2} textAlign="center">
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
      </Paper>
    </Box>
  );
};
