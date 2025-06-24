import React, { useEffect, useState } from "react";
import "./accountPage.css";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";
import AccountTable from "../../components/account/AccountTable";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { getUser } from "../../services/api";
import CreditCard from "../../components/account/CreditCard";
import { CreditCardList } from "../../components/account/CreditCard";

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
      <div style={{ display: "flex", alignItems: "flex-start", gap: 40, marginTop: 64, padding: '32px 0 0 0', width: '100%' }}>
        <div style={{ flex: 1, minWidth: 350 }}>
          {/* Ajuste: Añadir margen superior a accounts-container para separar del navbar */}
          {userError ? (
            <div className="accounts-container" style={{ color: "red", marginTop: 24 }}>{userError}</div>
          ) : !userId ? (
            <div className="accounts-container" style={{ marginTop: 24 }}>Cargando usuario...</div>
          ) : loading ? (
            <div className="accounts-container" style={{ marginTop: 24 }}>Cargando cuentas...</div>
          ) : error ? (
            <div className="accounts-container" style={{ color: "red", marginTop: 24 }}>
              Error al cargar cuentas: {error.message || error.toString()}
            </div>
          ) : (!accounts || accounts.length === 0) ? (
            <div className="accounts-container" style={{ marginTop: 24 }}>No tienes cuentas registradas.</div>
          ) : (
            <div className="accounts-container" style={{ marginTop: 24 }}>
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
        </div>
        <div style={{ flex: 1, minWidth: 350, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Mostrar una tarjeta por cada cuenta del usuario */}
          <CreditCardList accounts={accounts} userName={userName} />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
