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
      <Box className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-8 mx-auto my-6 w-full overflow-x-auto">
        <Box className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-6 min-w-[1200px]">
          <Box className="bg-blue-100 rounded-lg p-6 flex-1 min-w-[400px]">
            <Typography className="font-bold text-blue-900 text-xl mb-2 font-mono">DBB Compra</Typography>
            <Typography className="text-blue-900 mb-1 font-mono">Tengo USD, EUR o GBP y banco me da GTQ</Typography>
            <Typography className="text-blue-800 font-mono">1 USD = 7.46 GTQ</Typography>
            <Typography className="text-blue-800 font-mono">1 EUR = 8.79 GTQ</Typography>
            <Typography className="text-blue-800 font-mono">1 GBP = 10.18 GTQ</Typography>
          </Box>
          <Box className="bg-blue-100 rounded-lg p-6 flex-1 min-w-[400px]">
            <Typography className="font-bold text-blue-900 text-xl mb-2 font-mono">DBB Vende</Typography>
            <Typography className="text-blue-900 mb-1 font-mono">Tengo GTQ y banco me da USD, EUR o GBP</Typography>
            <Typography className="text-blue-800 font-mono">1 GTQ = 0.13 USD</Typography>
            <Typography className="text-blue-800 font-mono">1 GTQ = 0.11 EUR</Typography>
            <Typography className="text-blue-800 font-mono">1 GTQ = 0.09 GBP</Typography>
          </Box>
        </Box>

        <Typography variant="h6" className="text-blue-900 font-bold font-mono mb-2 text-center">
          Calcular
        </Typography>

      <Box className="flex flex-col items-center justify-center">
          <ToggleButtonGroup
            value={operation}
            exclusive
            onChange={(_, val) => val && setOperation(val)}
            className="flex justify-center mb-4"
          >
            <ToggleButton
              value="compra"
              className={`font-mono font-medium px-6 py-2 rounded-l-lg ${operation === "compra" ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"} transition`}
            >
              DBB Compra
            </ToggleButton>
            <ToggleButton
              value="vende"
              className={`font-mono font-medium px-6 py-2 rounded-r-lg ${operation === "vende" ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"} transition`}
            >
              DBB Vende
            </ToggleButton>
          </ToggleButtonGroup>

          <form onSubmit={handleSubmit} className="mb-2 min-w-[800px]">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Monto"
                  type="number"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="font-mono"
                  required
                  InputProps={{ className: "font-mono text-blue-900" }}
                  InputLabelProps={{ className: "font-mono text-blue-900" }}
                />
              </Grid>

              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel className="font-mono text-blue-900">De</InputLabel>
                  <Select
                    value={fromCurrency}
                    label="De"
                    disabled={operation === "vende"}
                    onChange={(e) => operation === "compra" && setFromCurrencySelected(e.target.value)}
                    className="font-mono text-blue-900"
                  >
                    {operation === "compra" ? (
                      currencyOptions.filter(opt => opt.code !== "GTQ").map(option => (
                        <MenuItem key={option.code} value={option.code} className="font-mono text-blue-900">
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={fromCurrency} className="font-mono text-blue-900">
                        {currencyOptions.find(opt => opt.code === fromCurrency)?.label}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={2} className="flex items-center justify-center">
                <Typography className="text-blue-900 text-2xl font-bold">⇄</Typography>
              </Grid>

              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel className="font-mono text-blue-900">A</InputLabel>
                  <Select
                    value={toCurrency}
                    label="A"
                    disabled={operation === "compra"}
                    onChange={(e) => operation === "vende" && setToCurrencySelected(e.target.value)}
                    className="font-mono text-blue-900"
                  >
                    {operation === "vende" ? (
                      currencyOptions.filter(opt => opt.code !== "GTQ").map(option => (
                        <MenuItem key={option.code} value={option.code} className="font-mono text-blue-900">
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={toCurrency} className="font-mono text-blue-900">
                        {currencyOptions.find(opt => opt.code === toCurrency)?.label}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Botón fuera del Grid */}
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                className="group w-1/3 font-mono font-medium rounded-lg px-4 py-2 bg-blue-900 text-blue-100 hover:bg-blue-800 transition"
              >
                {isLoading ? "Calculando…" : "Calcular"}
              </Button>
            </div>
          </form>


          {conversionRate !== null && netAmount !== null && lastCalculation && (
            <Box className="bg-blue-100 rounded-lg p-4 mt-4 text-center min-w-[400px]">
              <Typography className="font-bold text-blue-900 font-mono mb-2">Resultado:</Typography>
              <Typography className="text-blue-900 font-mono text-lg">
                {lastCalculation.amount} {lastCalculation.fromCurrency} = {netAmount.toFixed(2)} {lastCalculation.toCurrency}
              </Typography>
            </Box>
          )}

          {error && (
            <Typography color="error" mt={2} className="font-mono text-center">
              {error}
            </Typography>
          )}

          <Typography 
            variant="body2" 
            color="text.secondary" 
            mt={3} 
            textAlign="center"
            className="italic text-blue-900"
          >
            * Tenemos una comisión del 3% por cada cambio de divisa
          </Typography>
        </Box>
      </Box>
    );
  };
