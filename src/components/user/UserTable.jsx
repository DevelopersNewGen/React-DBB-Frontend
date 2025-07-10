import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserEditRole } from "./UserEditRole";
import { useUserUpdateRole } from "../../shared/hooks";
import { useNavigate } from "react-router-dom";

export const UserTable = ({
  users,
  loading,
  onEditUser,
  onDeleteUser,
  onAccountsUser,
  title,
  showEdit = true,

}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuRow, setMenuRow] = React.useState(null);
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const { changeUserRole, loading: changingRole } = useUserUpdateRole();
  const navigate = useNavigate();

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  const handleOpenRoleModal = () => {
    setSelectedUser(menuRow);
    setRoleModalOpen(true);
    handleMenuClose();
  };

  const handleCloseRoleModal = () => {
    setRoleModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveRole = async (uid, newRole) => {
    const ok = await changeUserRole(uid, newRole);
    if (ok) {
      handleCloseRoleModal();
      window.location.reload();
    }
  };

  const handleCreateAccount = () => {
    if (menuRow?.uid) {
      navigate(`/create-account/${menuRow.uid}`);
    }
    handleMenuClose();
  };

  const columns = [
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 130 },
    { field: "username", headerName: "Usuario", flex: 1, minWidth: 110 },
    { field: "dpi", headerName: "DPI", flex: 1, minWidth: 130 },
    { field: "address", headerName: "Dirección", flex: 1, minWidth: 150 },
    { field: "cellphone", headerName: "Teléfono", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    { field: "jobName", headerName: "Puesto", flex: 1, minWidth: 120 },
    { field: "monthlyIncome", headerName: "Ingreso Mensual", flex: 1, minWidth: 130 },
    { field: "role", headerName: "Rol", flex: 1, minWidth: 110 },
    {
      field: "actions",
      headerName: "Acciones",
      minWidth: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={(e) => handleMenuOpen(e, params.row)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>{title}</h2>
      <div style={{ height: 600, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.uid}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 40]}
          disableRowSelectionOnClick
          autoHeight={false}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              onAccountsUser && onAccountsUser(menuRow);
              handleMenuClose();
            }}
          >
            Cuentas
          </MenuItem>
          <MenuItem onClick={handleCreateAccount}>
            Crear Cuenta
          </MenuItem>
          {showEdit && [
            <MenuItem
              key="edit"
              onClick={() => {
                onEditUser && onEditUser(menuRow);
                handleMenuClose();
              }}
            >
              Editar
            </MenuItem>,
            <MenuItem
              key="delete"
              onClick={() => {
                if (
                  window.confirm(
                    `¿Seguro que quieres eliminar a ${menuRow?.name || "este usuario"}?`
                  )
                ) {
                  onDeleteUser && onDeleteUser(menuRow);
                }
                handleMenuClose();
              }}
              sx={{ color: "error.main" }}
            >
              Eliminar
            </MenuItem>,
            menuRow?.role === "CLIENT_ROLE" && (
              <MenuItem
                key="change-role"
                onClick={handleOpenRoleModal}
              >
                Cambiar Rol
              </MenuItem>
            )
          ]}
        </Menu>
        <UserEditRole
          open={roleModalOpen}
          onClose={handleCloseRoleModal}
          user={selectedUser}
          onSave={handleSaveRole}
          loading={changingRole}
        />
      </div>
    </div>
  );
};