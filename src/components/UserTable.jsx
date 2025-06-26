import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const UserTable = ({ users, loading }) => {
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "username", headerName: "Usuario", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "role", headerName: "Rol", width: 100 },
    { field: "status", headerName: "Estado", width: 100, valueGetter: (params) => params.row.status ? "Activo" : "Inactivo" },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableRowSelectionOnClick
      />
    </div>
  );
};