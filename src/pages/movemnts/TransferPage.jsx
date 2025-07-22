import React from "react";
import TransferForm from "../../components/movemnts/TransferForm";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { Alert } from "@mui/material";
import { useTransfer } from "../../shared/hooks/useTransfer";

export const TransferPage = () => {
  const { handleTransfer, loading, error, success } = useTransfer();
  const [resultMsg, setResultMsg] = React.useState(null);

  const onSubmit = async (form) => {
    setResultMsg(null);
    const res = await handleTransfer(form);
    if (res?.msg) setResultMsg(res.msg);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ marginTop: 90 }}>
        <TransferForm onSubmit={onSubmit} loading={loading} />
        {error && (
          <Alert severity="error" sx={{ mt: 2, maxWidth: 400, mx: "auto" }}>
            {typeof error === "string" ? error : "Error al transferir"}
          </Alert>
        )}
      </div>
    </>
  );
};

export default TransferPage;