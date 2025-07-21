import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { useUserList, useUserDelete } from "../../shared/hooks";
import { UserTable } from "../../components/user/UserTable.jsx";
import { UserAdd } from "../../components/user/UserAdd.jsx";
import { UserEditAdmin } from "../../components/user/UserEditAdmin.jsx";

export const UserTablePage = () => {
  const [refresh, setRefresh] = useState(false);
  const { users, isLoading, error } = useUserList(refresh);

  const [editUser, setEditUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const { deleteUser, loading: deletingUser } = useUserDelete();

  const handleUserCreated = () => setRefresh((r) => !r);

  const handleEditUser = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };

  const handleEditClose = (updated) => {
    setEditOpen(false);
    setEditUser(null);
    if (updated) setRefresh((r) => !r);
  };

  const handleDeleteUser = async (user) => {
    const ok = await deleteUser(user.uid);
    if (ok) setRefresh((r) => !r);
  };

  const clientUsers = users.filter((u) => u.role === "CLIENT_ROLE");
  const adminUsers = users.filter((u) => u.role === "ADMIN_ROLE");

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          Gestión de Usuarios
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
          }}
        >
          <UserAdd onUserCreated={handleUserCreated} />
        </Paper>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {(isLoading || deletingUser) && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                Clientes
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <UserTable
                users={clientUsers}
                loading={isLoading || deletingUser}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                showEdit={true}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                Administradores
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <UserTable
                users={adminUsers}
                loading={isLoading || deletingUser}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                showEdit={false}
              />
            </Paper>
          </Grid>
        </Grid>

        <UserEditAdmin
          open={editOpen}
          onClose={() => handleEditClose(false)}
          user={editUser}
          onUserUpdated={() => handleEditClose(true)}
        />
      </Box>
    </>
  );
};
