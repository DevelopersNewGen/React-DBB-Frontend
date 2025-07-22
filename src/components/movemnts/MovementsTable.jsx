import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, TextField, Box, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { MovementActionsDialog } from "./MovementsActionsForm.jsx";
import { useMovementsTable } from "../../shared/hooks/useMovementsTable.jsx";

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



const columns = [
    { field: "amount", headerName: "Monto", flex: 1, minWidth: 120, headerClassName: "super-header", renderCell: (params) => `$${params.value}` },
    { field: "type", headerName: "Tipo", flex: 1, minWidth: 120, headerClassName: "super-header", renderCell: (params) => <Chip label={params.value} color={typeColors[params.value] || "default"} size="small" /> },
    { field: "description", headerName: "Descripción", flex: 1, minWidth: 180, headerClassName: "super-header", renderCell: (params) => params.value || "-" },
    { field: "balanceAfter", headerName: "Saldo después", flex: 1, minWidth: 140, headerClassName: "super-header", renderCell: (params) => `$${params.value}` },
    { field: "originAccount", headerName: "Cuenta Origen", flex: 1, minWidth: 160, headerClassName: "super-header", renderCell: (params) => {
        const val = params.value;
        if (!val) return "-";
        if (typeof val === "object" && val !== null) return val.accountNumber || val._id || "-";
        return val;
    }},
    { field: "destinationAccount", headerName: "Cuenta Destino", flex: 1, minWidth: 160, headerClassName: "super-header", renderCell: (params) => {
        const val = params.value;
        if (!val) return "-";
        if (typeof val === "object" && val !== null) return val.accountNumber || val._id || "-";
        return val;
    }},
    { field: "status", headerName: "Estatus", flex: 1, minWidth: 120, headerClassName: "super-header", renderCell: (params) => <Chip label={params.value} color={statusColors[params.value] || "default"} size="small" /> },
    { field: "date", headerName: "Fecha", flex: 1, minWidth: 180, headerClassName: "super-header", renderCell: (params) => params.value ? new Date(params.value).toLocaleString() : "-" },
    {
        field: "actions",
        headerName: "Acciones",
        flex: 1,
        minWidth: 120,
        headerClassName: "super-header",
        renderCell: (params) => (
            params.row.role === "ADMIN_ROLE" && params.row.type === "DEPOSIT" && params.row.status !== "REVERTED" ? (
                <Tooltip title="Actualizar/Revertir">
                    <span>
                        <IconButton
                            size="small"
                            onClick={() => params.row.onActionClick && params.row.onActionClick(params.row)}
                            sx={{ color: "#1976d2" }}
                        >
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            ) : null
        ),
    },
];

export const MovementsTable = ({ role }) => {
    const {
        page, setPage, rowsPerPage, setRowsPerPage, total, loading,
        search, setSearch, filteredMovements,
        selectedMovement, dialogOpen,
        successMsg, setSuccessMsg, errorMsg, setErrorMsg,
        handleActionClick, handleDialogClose, handleUpdate, handleRevert,
        actionLoading, actionError
    } = useMovementsTable(role);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({});


    useEffect(() => {
        const updateColumnVisibility = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setColumnVisibilityModel({
                    description: false,
                    originAccount: false,
                    destinationAccount: false,
                    date: false,
                    actions: false,
                });
            } else if (width < 1200) {
                setColumnVisibilityModel({
                    description: true,
                    originAccount: false,
                    destinationAccount: false,
                    date: true,
                    actions: true,
                });
            } else {
                setColumnVisibilityModel({});
            }
        };

        updateColumnVisibility();
        window.addEventListener("resize", updateColumnVisibility); 
        return () => window.removeEventListener("resize", updateColumnVisibility);
    }, []);


    return (
        <div
            className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-8 mx-auto my-6 w-full"
            style={{ overflowX: "auto" }}
            >
            <Box sx={{ p: 2, width: "100%", maxWidth: "1700px" }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                    fullWidth
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': { color: '#222' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#bbb' },
                            '&:hover fieldset': { borderColor: '#1976d2' },
                            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                        },
                        '& label': { color: '#222' },
                        '& label.Mui-focused': { color: '#1976d2' }
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                }}
                className="px-4 md:px-8"
                >
                <div style={{ height: "750px", minWidth: "1300px" }}>
                    <DataGrid
                    rows={filteredMovements ? filteredMovements.map(mov => ({ ...mov, onActionClick: handleActionClick, role })) : []}
                    columns={columns}
                    getRowId={(row) => row._id || row.id || row.date + row.amount}
                    loading={loading}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    pagination
                    rowCount={total}
                    page={page}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => { setRowsPerPage(size); setPage(0); }}
                    disableRowSelectionOnClick
                    columnVisibilityModel={columnVisibilityModel}
                    sx={{
                        minWidth: "1300px",
                        border: "none",
                        fontFamily: "Poppins, monospace",
                        "& .super-header": {
                        backgroundColor: "#1e293b",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: "monospace",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                        borderRadius: "12px 12px 0 0",
                        },
                        "& .MuiDataGrid-row": {
                        backgroundColor: "#fff",
                        fontFamily: "monospace",
                        fontSize: 16,
                        "&:hover": { backgroundColor: "#e3f2fd" },
                        },
                        "& .MuiDataGrid-cell": {
                        fontSize: 16,
                        color: "#1e293b",
                        fontFamily: "monospace",
                        borderBottom: "1px solid #e0e7ef",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        },
                        "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#f0f2f5",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#f8fafc",
                        },
                        "& .MuiIconButton-root": {
                        color: "#1e293b",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                        },
                    }}
                    />
                </div>
                </Box>

            <MovementActionsDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                movement={selectedMovement}
                onUpdate={handleUpdate}
                onRevert={handleRevert}
                loading={actionLoading}
                error={actionError}
            />

            <Snackbar open={!!successMsg} autoHideDuration={3000} onClose={() => setSuccessMsg("")} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setSuccessMsg("")} severity="success" sx={{ width: '100%' }}>
                    {successMsg}
                </Alert>
            </Snackbar>

            <Snackbar open={!!errorMsg} autoHideDuration={3000} onClose={() => setErrorMsg("")} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setErrorMsg("")} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
};
