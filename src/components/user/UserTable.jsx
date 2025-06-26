import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const UserTable = ({
  users,
  loading,
  onEditUser,
  onDeleteUser,
  onAccountsUser,
  title,
  showEdit = true
}) => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuRow, setMenuRow] = React.useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
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
            </MenuItem>
          ]}
        </Menu>
      </div>
    </div>
  );
};