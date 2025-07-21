import React, { useEffect, useState } from "react";
import { useAdminAccounts } from "../../shared/hooks/useAdminAccounts";
import { useUserAccounts } from "../../shared/hooks/useUserAccounts";
import AccountTable from "../../components/account/AccountTable";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { getUser } from "../../services/api";
import { CreditCardList } from "../../components/account/CreditCard";
import AllAccountsTable from "../../components/account/AllAccountsTable";

export const AccountPage = () => {
  const [userId, setUserId] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getUser()
      .then((res) => {
        const id = res?.data?.user?._id || res?.data?.user?.id || res?.data?.user?.uid;
        const role = res?.data?.user?.role;
        if (!id) {
          setUserError("No se pudo obtener el id del usuario autenticado");
        }
        setUserId(id);
        setIsAdmin(role === "ADMIN_ROLE");
      })
      .catch((err) => {
        setUserError("Error al obtener usuario: " + (err?.message || err.toString()));
      });
  }, []);

  const adminAccounts = useAdminAccounts();
  const userAccounts = useUserAccounts(userId);

  const accounts = isAdmin ? adminAccounts.accounts : userAccounts.accounts;
  const loading = isAdmin ? adminAccounts.loading : userAccounts.loading;
  const error = isAdmin ? adminAccounts.error : userAccounts.error;

  console.log("Accounts:", accounts);

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 40, marginTop: 64, padding: '32px 0 0 0', width: '100%' }}>
        <div style={{ flex: 1, minWidth: 350 }}>
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
          ) : isAdmin ? (
            <AllAccountsTable />
          ) : (!accounts || accounts.length === 0) ? (
            <div className="accounts-container" style={{ marginTop: 24 }}>No tienes cuentas registradas.</div>
          ) : (
            <div className="accounts-container" style={{ marginTop: 24 }}>
              {accounts.map((acc) => (
                <AccountTable
                  accountId={acc.uid}
                  key={acc.accountNumber}
                  accountNumber={acc.accountNumber}
                  userName={acc.userName}
                  balance={acc.balance}
                  accountType={acc.accountType}
                />
              ))}
            </div>
          )}
        </div>
        {!isAdmin && (
          <div style={{ flex: 1, minWidth: 350, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <CreditCardList accounts={accounts} />
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPage;