import React, { useState } from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { useUserList } from "../../shared/hooks/useUserList";
import { UserTable } from "../../components/user/UserTable.jsx";
import { UserAdd } from "../../components/user/UserAdd.jsx";

export const UserTablePage = () => {
  const { users, isLoading, error } = useUserList();
  const [refresh, setRefresh] = useState(false);

  const handleUserCreated = () => {
    setRefresh((r) => !r);
  };

  const clientUsers = users.filter((u) => u.role === "CLIENT_ROLE");
  const adminUsers = users.filter((u) => u.role === "ADMIN_ROLE");

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: 24, marginTop: 90 }}>
        <h2>Usuarios</h2>
        <UserAdd onUserCreated={handleUserCreated} />
        {error && <div style={{ color: "red" }}>{error}</div>}

        <div style={{ marginBottom: 40 }}>
          <UserTable users={clientUsers} loading={isLoading} title="Clientes" />
        </div>
        <div>
          <UserTable users={adminUsers} loading={isLoading} title="Administradores" />
        </div>
      </div>
    </>
  );
};