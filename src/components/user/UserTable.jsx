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
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 180, headerClassName: "super-header" },
    { field: "username", headerName: "Usuario", flex: 1, minWidth: 140, headerClassName: "super-header" },
    { field: "dpi", headerName: "DPI", flex: 1, minWidth: 180, headerClassName: "super-header" },
    { field: "address", headerName: "Dirección", flex: 1, minWidth: 180, headerClassName: "super-header" },
    { field: "cellphone", headerName: "Teléfono", flex: 1, minWidth: 140, headerClassName: "super-header" },
    { field: "email", headerName: "Email", flex: 1, minWidth: 260, headerClassName: "super-header" },
    { field: "jobName", headerName: "Puesto", flex: 1, minWidth: 160, headerClassName: "super-header" },
    { field: "monthlyIncome", headerName: "Ingreso Mensual", flex: 1, minWidth: 160, headerClassName: "super-header" },
    { field: "role", headerName: "Rol", flex: 1, minWidth: 140, headerClassName: "super-header" },
    {
      field: "actions",
      headerName: "Acciones",
      minWidth: 100,
      sortable: false,
      filterable: false,
      headerClassName: "super-header",
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
    <div className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-8 mx-auto my-6 w-full overflow-x-auto">
      <h2 className="text-blue-900 font-bold text-xl md:text-2xl mb-4 text-center font-mono tracking-wide">
        {title}
      </h2>
      <div className="min-w-[1800px] w-full" style={{ height: "700px" }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.uid}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 40]}
          disableRowSelectionOnClick
          autoHeight={false}
          sx={{
            border: "none",
            fontFamily: "Poppins, monospace",
            "& .super-header": {
              backgroundColor: "#1e293b",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 1,
              fontFamily: "monospace",
              borderRight: "1px solid #334155",
              borderTop: "none",
              borderBottom: "none",
              minHeight: "60px",
              maxHeight: "60px",
              paddingLeft: "16px",
              paddingRight: "16px",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderRadius: "12px 12px 0 0",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#fff",
              fontFamily: "monospace",
              fontSize: 16,
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            },
            "& .MuiDataGrid-cell": {
              fontSize: 16,
              color: "#1e293b",
              fontFamily: "monospace",
              borderBottom: "1px solid #e0e7ef",
              paddingLeft: "16px",
              paddingRight: "16px",
              maxWidth: "400px",
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f0f2f5",
              borderTop: "none",
              fontFamily: "monospace",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#f8fafc",
            },
            "& .MuiIconButton-root": {
              color: "#1e293b",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            },
          }}
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