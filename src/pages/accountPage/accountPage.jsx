import React, { useEffect } from "react";
import "./accountPage.css";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";
import AccountTable from "../../components/account/AccountTable";
import { useNavigate } from "react-router-dom";

export const AccountPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { accounts, userName, loading, error } = useUserAccounts(user?.uid);

  if (loading)
    return <div className="accounts-container">Cargando cuentas...</div>;

  return (
    <div className="accounts-container">
      {accounts.map((acc, idx) => (
        <AccountTable
          key={acc.accountNumber + idx}
          accountNumber={acc.accountNumber}
          userName={userName}
          balance={acc.balance}
          accountType={acc.accountType}
        />
      ))}
    </div>
  );
};

export default AccountPage;
