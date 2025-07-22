import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAccounts } from "../../shared/hooks/useAccounts.jsx";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllAccountsTable = () => {
  const { accounts, loading } = useAccounts();
  const navigate = useNavigate();

  const columns = [
    { 
      field: "accountNumber", 
      headerName: "Número de Cuenta", 
      flex: 1, 
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-header"
    },
    { 
      field: "balance", 
      headerName: "Balance", 
      flex: 1, 
      minWidth: 220,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-header",
      valueFormatter: (params) => 
        params.value?.toLocaleString("es-ES", { style: 'currency', currency: 'USD' }) ?? '',
    },
    { 
      field: "accountType", 
      headerName: "Tipo de Cuenta", 
      flex: 1, 
      minWidth: 230,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-header"
    },
    { 
      field: "userName", 
      headerName: "Nombre del Usuario", 
      flex: 1, 
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-header"
    },
    {
      field: "verMovimientos",
      headerName: "Ver Movimientos",
      flex: 1,
      minWidth: 180,
      sortable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-header",
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => navigate(`/movimientos/cuenta/${params.row.uid}`)}
          sx={{ borderRadius: "20px", fontWeight: 600, textTransform: "none" }}
        >
          Ver Movimientos
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-8 mx-auto my-6 w-full overflow-x-auto">
      <Typography 
        variant="h4" 
        align="center" 
        className="text-blue-900 font-bold font-mono tracking-wide mb-4"
      >
        Todas las Cuentas
      </Typography>
      <div className="min-w-[1500px] w-full" style={{ height: "700px" }}>
        <DataGrid
          rows={accounts}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.accountNumber}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 40]}
          disableRowSelectionOnClick
          autoHeight={false}
          sx={{ border: "none",
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
            "& .MuiButton-root": {
              transition: "background 0.2s",
            },}}
        />
      </div>
    </div>
  );
};


export default AllAccountsTable;