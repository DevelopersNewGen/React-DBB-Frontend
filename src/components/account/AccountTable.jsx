import React from "react";

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

const AccountTable = ({ accountNumber, userName, balance, accountType }) => (
  <div className="account-block">
    <h2 className="account-title">
      CUENTA: {getTypeLabel(accountType)}
      <span className="account-title-underline"></span>
    </h2>
    <div className="account-table">
      <div className="account-table-header">
        <span>NO. CUENTA</span>
        <span>NOMBRE</span>
        <span>DISPONIBLE</span>
      </div>
      <div className="account-table-row">
        <span>{accountNumber}</span>
        <span>{userName}</span>
        <span>
          Q
          {balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  </div>
);

export default AccountTable;
