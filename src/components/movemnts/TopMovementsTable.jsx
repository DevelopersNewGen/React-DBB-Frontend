import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from '@mui/material';

export const TopMovementsTable = ({ topAccounts = [] }) => {
  const columns = [
    { field: "idx", headerName: "#", minWidth: 80, flex: 1, headerClassName: "super-header" },
    { field: "name", headerName: "Nombre", minWidth: 180, flex: 1, headerClassName: "super-header" },
    { field: "username", headerName: "Usuario", minWidth: 140, flex: 1, headerClassName: "super-header" },
    { field: "email", headerName: "Email", minWidth: 220, flex: 1, headerClassName: "super-header" },
    { field: "accountNumber", headerName: "Número de Cuenta", minWidth: 220, flex: 1, headerClassName: "super-header" },
    { field: "accountType", headerName: "Tipo de Cuenta", minWidth: 180, flex: 1, headerClassName: "super-header" },
    { field: "totalMovements", headerName: "Total Movimientos", minWidth: 180, flex: 1, headerClassName: "super-header" },
  ];

  const rows = topAccounts.map((item, idx) => ({
    id: item.account?._id || idx,
    idx: idx + 1,
    name: item.owner?.name || '-',
    username: item.owner?.username || '-',
    email: item.owner?.email || '-',
    accountNumber: item.account?.accountNumber || '-',
    accountType: item.account?.accountType || '-',
    totalMovements: item.totalMovements,
  }));

  return (
    <Paper
      sx={{
        background: "#fff",
        color: "#222",
        mt: 5, // Espacio superior
        boxShadow: 3,
        borderRadius: 3
      }}
    >
      <Typography variant="h6" sx={{ p: 2, color: "#1976d2", fontWeight: "bold", fontSize: "20px" }}>
        Cuentas con más movimientos
      </Typography>
      <div className="min-w-[1400px] w-full" style={{ height: "600px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
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
          }}
          localeText={{
            noRowsLabel: "No hay datos para mostrar.",
            footerRowSelected: (count) => `${count.toLocaleString()} seleccionados`,
            footerTotalRows: "Total de filas:",
            MuiTablePagination: {
              labelRowsPerPage: "Filas por página",
            },
          }}
        />
      </div>
    </Paper>
  );
};