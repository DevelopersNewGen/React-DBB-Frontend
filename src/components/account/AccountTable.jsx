import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const getTypeLabel = (type) => {
  switch (type) {
    case "MONETARY":
      return "MONETARIA";
    case "SAVER":
      return "AHORRO";
    default:
      return type;
  }
};

const AccountTable = ({ accountId, accountNumber, balance, accountType }) => {
  const navigate = useNavigate();

  return (
    <div className="account-block" style={{ marginBottom: "32px" }}>
      <h2 className="account-title" style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>
        CUENTA: {getTypeLabel(accountType)}
        <span className="account-title-underline" style={{ display: "block", borderBottom: "2px solid #000", marginTop: "4px", width: "100px" }}></span>
      </h2>

      <div className="account-table" style={{ marginTop: "12px", backgroundColor: "#111", color: "#fff", borderRadius: "4px", overflow: "hidden" }}>
        <div
          className="account-table-header"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
            padding: "18px 32px",
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            borderBottom: "2px solid #fff",
          }}
        >
          <span>NO. CUENTA</span>
          <span style={{ textAlign: "right" }}>DISPONIBLE</span>
        </div>

        <div
          className="account-table-row"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
            padding: "20px 32px",
            fontSize: "1.1rem",
            fontWeight: 500,
            alignItems: "center",
          }}
        >
          <span style={{ wordBreak: "break-word" }}>{accountNumber}</span>
          <span style={{ textAlign: "right" }}>
            Q
            {balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/movimientos/cuenta/${accountId}`)}
        >
          Ver Movimientos
        </Button>
      </div>
    </div>
  );
};

export default AccountTable;