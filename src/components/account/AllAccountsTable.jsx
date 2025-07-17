import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAccounts } from "../../shared/hooks/useAccounts.jsx";
import { Button, Paper, Box, Typography } from "@mui/material";
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
    },
    { 
      field: "balance", 
      headerName: "Balance", 
      flex: 1, 
      minWidth: 220,
      headerAlign: "center",
      align: "center",
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
    },
    { 
      field: "userName", 
      headerName: "Nombre del Usuario", 
      flex: 1, 
      minWidth: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "verMovimientos",
      headerName: "Ver Movimientos",
      flex: 1,
      minWidth: 180,
      sortable: false,
      headerAlign: "center",
      align: "center",
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
    <Box 
      sx={{ 
        maxWidth: 1300, 
        mx: "auto", 
        p: { xs: 1, md: 3 }, 
        mt: 3 
      }}
    >
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ mb: 3, fontWeight: 1000, color: "#1e1e1e" }}
      >
        Todas las Cuentas
      </Typography>
      <Paper 
        elevation={5} 
        sx={{ 
          borderRadius: 4, 
          overflow: "hidden", 
          background: "#f8fafc", 
          p: 2 
        }}
      >
        <DataGrid
          rows={accounts}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.accountNumber}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 40]}
          disableRowSelectionOnClick
          autoHeight={false}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1,
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            },
            "& .MuiDataGrid-cell": {
              fontSize: 15,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f0f2f5",
              borderTop: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#f8fafc",
            },
            "& .MuiButton-root": {
              transition: "background 0.2s",
            },
            "& .MuiDataGrid-columnHeader": {
      color: "#1976d2", // Solo el header "Número de Cuenta" en rojo
      fontWeight: "bold",
              },
          }}
        />
      </Paper>
    </Box>
  );
};

export default AllAccountsTable;