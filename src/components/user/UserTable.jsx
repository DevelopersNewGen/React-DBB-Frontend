import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export const UserTable = ({ users, loading, onEditUser }) => {
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
      headerName: "Editar",
      minWidth: 90, 
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 0, px: 1, fontSize: "0.75rem" }} 
          onClick={() => onEditUser && onEditUser(params.row)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>CLIENTES</h2>
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
      </div>
    </div>
  );
};