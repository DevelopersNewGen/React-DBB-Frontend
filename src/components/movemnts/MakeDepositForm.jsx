import React, { useState } from "react";
import useMakeDeposit from "../../shared/hooks/useMakeDeposit";
import { useAdminAccounts } from "../../shared/hooks/useAdminAccounts";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Autocomplete,
} from "@mui/material";

const MakeDepositForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const { deposit, loading, success, error } = useMakeDeposit();
  const { accounts, loading: isLoading } = useAdminAccounts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deposit({ destinationAccount, amount, description });
    setAmount("");
    setDescription("");
    setDestinationAccount("");
  };

  return (
    <div className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-10 mx-auto my-6 w-full max-w-[2200px] flex flex-col items-center">
      <Typography
        variant="h5"
        align="center"
        className="text-blue-900 font-bold font-mono tracking-wide mb-6"
      >
        Realizar Depósito
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* CUENTA DESTINO */}
        <div className="md:col-span-2">
          <Autocomplete
            id="destinationAccount"
            options={accounts}
            getOptionLabel={(acc) =>
              acc ? `${acc.accountNumber} - ${acc.accountType}` : ""
            }
            value={
              accounts.find(
                (acc) => acc.accountNumber === destinationAccount
              ) || null
            }
            onChange={(_, newValue) =>
              setDestinationAccount(newValue ? newValue.accountNumber : "")
            }
            loading={isLoading}
            disabled={isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cuenta destino"
                required
                fullWidth
              />
            )}
          />
        </div>

        {/* MONTO */}
        <TextField
          label="Monto"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          inputProps={{ min: 1 }}
          fullWidth
        />

        {/* DESCRIPCIÓN */}
        <TextField
          label="Descripción"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
        />

        {/* BOTÓN */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || isLoading}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Depositar"}
          </Button>
        </div>

        {success && (
          <Typography className="text-green-700 text-sm text-center font-medium md:col-span-2">
            Depósito realizado con éxito.
          </Typography>
        )}
        {error && (
          <Typography className="text-red-600 text-sm text-center font-medium md:col-span-2">
            {typeof error === "string"
              ? error
              : error?.message ||
                error?.response?.data?.msg ||
                "Error desconocido"}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default MakeDepositForm;
