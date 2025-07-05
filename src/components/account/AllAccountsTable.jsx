import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAccounts } from "../../shared/hooks/useAccounts.jsx";

const AllAccountsTable = () => {
  const { accounts, loading } = useAccounts();

  const columns = [
    { field: "accountNumber", headerName: "Número de Cuenta", flex: 1, minWidth: 250 },
    { field: "balance", headerName: "Balance", flex: 1, minWidth: 220 },
    { field: "accountType", headerName: "Tipo de Cuenta", flex: 1, minWidth: 230 },
    { field: "userName", headerName: "Nombre del Usuario", flex: 1, minWidth: 250 },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Todas las Cuentas</h2>
      <div style={{ height: 700, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={accounts}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.accountNumber}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 40]}
          disableRowSelectionOnClick
          autoHeight={false}
        />
      </div>
    </div>
  );
};

export default AllAccountsTable;