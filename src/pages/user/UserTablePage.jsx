import React, { useState } from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { useUserList } from "../../shared/hooks";
import { UserTable } from "../../components/user/UserTable.jsx";
import { UserAdd } from "../../components/user/UserAdd.jsx";
import { UserEditAdmin } from "../../components/user/UserEditAdmin.jsx";

export const UserTablePage = () => {
  const [refresh, setRefresh] = useState(false);
  const { users, isLoading, error } = useUserList(refresh);

  const [editUser, setEditUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleUserCreated = () => {
    setRefresh((r) => !r);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };

  const handleEditClose = (updated) => {
    setEditOpen(false);
    setEditUser(null);
    if (updated) setRefresh((r) => !r);
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
          <UserTable
            users={clientUsers}
            loading={isLoading}
            title="Clientes"
            onEditUser={handleEditUser}
          />
        </div>
        <div>
          <UserTable
            users={adminUsers}
            loading={isLoading}
            title="Administradores"
            onEditUser={handleEditUser}
          />
        </div>

        {/* Modal de edición */}
        <UserEditAdmin
          open={editOpen}
          onClose={() => handleEditClose(false)}
          user={editUser}
          onUserUpdated={() => handleEditClose(true)}
        />
      </div>
    </>
  );
};