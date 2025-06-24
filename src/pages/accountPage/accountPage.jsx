import React, { useEffect, useState } from "react";
import "./accountPage.css";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";
import AccountTable from "../../components/account/AccountTable";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { getUser } from "../../services/api";

export const AccountPage = () => {
  const [userId, setUserId] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    getUser()
      .then((res) => {
        const id = res?.data?.user?._id || res?.data?.user?.id || res?.data?.user?.uid;
        if (!id) {
          setUserError("No se pudo obtener el id del usuario autenticado");
        }
        setUserId(id);
      })
      .catch((err) => {
        setUserError("Error al obtener usuario: " + (err?.message || err.toString()));
      });
  }, []);

  const { accounts, userName, loading, error } = useUserAccounts(userId);

  return (
    <>
      <ResponsiveAppBar />
      {userError ? (
        <div className="accounts-container" style={{ color: "red" }}>{userError}</div>
      ) : !userId ? (
        <div className="accounts-container">Cargando usuario...</div>
      ) : loading ? (
        <div className="accounts-container">Cargando cuentas...</div>
      ) : error ? (
        <div className="accounts-container" style={{ color: "red" }}>
          Error al cargar cuentas: {error.message || error.toString()}
        </div>
      ) : (!accounts || accounts.length === 0) ? (
        <div className="accounts-container">No tienes cuentas registradas.</div>
      ) : (
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
      )}
    </>
  );
};

export default AccountPage;
