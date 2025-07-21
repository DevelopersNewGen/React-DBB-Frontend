import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { useAccountMovements } from "../../shared/hooks/useAccountMovements";

const statusColors = {
    REVERTED: "error",
    COMPLETED: "success",
    PENDING: "warning",
};

const typeColors = {
    DEPOSIT: "primary",
    WITHDRAWAL: "secondary",
    TRANSFER: "info",
};

export const AccountsMovements = ({ accountId }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { movements, total } = useAccountMovements(accountId, page, rowsPerPage);

    const columns = [
        { field: "amount", headerName: "Monto", flex: 1, minWidth: 120, headerClassName: "super-header", renderCell: (params) => `$${params.value}` },
        { field: "type", headerName: "Tipo", flex: 1, minWidth: 120, headerClassName: "super-header", renderCell: (params) => <Chip label={params.value} color={typeColors[params.value] || "default"} size="small" /> },
        { field: "description", headerName: "Descripción", flex: 1, minWidth: 180, headerClassName: "super-header", renderCell: (params) => params.value || "-" },
        { field: "balanceAfter", headerName: "Saldo después", flex: 1, minWidth: 140, headerClassName: "super-header", renderCell: (params) => `$${params.value}` },
        { field: "originAccount", headerName: "Cuenta Origen", flex: 1, minWidth: 160, headerClassName: "super-header", renderCell: (params) => {
            const val = params.value;
            if (!val) return "-";
            if (typeof val === "object") return val.accountNumber || val._id || "-";
            return val;
        }},
        { field: "destinationAccount", headerName: "Cuenta Destino", flex: 1, minWidth: 160, headerClassName: "super-header", renderCell: (params) => {
            const val = params.value;
            if (!val) return "-";
            if (typeof val === "object") return val.accountNumber || val._id || "-";
            return val;
        }},
        { field: "status", headerName: "Estatus", flex: 1, minWidth: 120, headerClassName: "super-header", renderCell: (params) => <Chip label={params.value} color={statusColors[params.value] || "default"} size="small" /> },
        { field: "date", headerName: "Fecha", flex: 1, minWidth: 180, headerClassName: "super-header", renderCell: (params) => params.value ? new Date(params.value).toLocaleString() : "-" },
    ];

    return (
        <div className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-8 mx-auto my-6 w-full overflow-x-auto">
            <h2 className="text-blue-900 font-bold text-xl md:text-2xl mb-4 text-center font-mono tracking-wide">
                Movimientos de la Cuenta
            </h2>
            <div className="min-w-[1800px] w-full" style={{ height: "700px" }}>
                <DataGrid
                    rows={movements || []}
                    columns={columns}
                    getRowId={(row) => row._id || row.id || row.date + row.amount}
                    loading={!movements}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    pagination
                    paginationMode="server"
                    rowCount={total}
                    page={page}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => { setRowsPerPage(size); setPage(0); }}
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
                        noRowsLabel: "No hay movimientos para mostrar.",
                        footerRowSelected: (count) => `${count.toLocaleString()} seleccionados`,
                        footerTotalRows: "Total de filas:",
                        MuiTablePagination: {
                            labelRowsPerPage: "Filas por página",
                        },
                    }}
                />
            </div>
        </div>
    );
};