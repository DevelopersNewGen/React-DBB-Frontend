import React, { useEffect, useState } from 'react'
import { useRecentMovements } from '../../shared/hooks/useRecentMovements.jsx'
import { useUserAccounts } from '../../shared/hooks/useUserAccounts.jsx'
import { Autocomplete, TextField, Box, Paper, Chip, IconButton, Tooltip } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import EditIcon from "@mui/icons-material/Edit";
import { MovementActionsDialog } from "./MovementsActionsForm.jsx";
import { useMovementsActions } from "../../shared/hooks/useMovementsActions.jsx";
import { DataGrid } from "@mui/x-data-grid";

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
    {
        field: "actions",
        headerName: "Acciones",
        flex: 1,
        minWidth: 120,
        headerClassName: "super-header",
        renderCell: (params) => (
            <Tooltip title="Actualizar/Revertir">
                <span>
                    <IconButton
                        size="small"
                        onClick={() => params.row.status !== "REVERTED" && params.row.onActionClick && params.row.onActionClick(params.row)}
                        disabled={params.row.status === "REVERTED"}
                    >
                        <EditIcon />
                    </IconButton>
                </span>
            </Tooltip>
        ),
    },
];

export const RecentmovmentsTable = () => {
    const navigate = useNavigate();
    const { accountId } = useParams();
    const { accounts } = useUserAccounts();
    const [Account, setAccount] = useState(accountId || "");
    const { movements, loading, error, refetch } = useRecentMovements(Account);


    const { updateMovement, revertMovement, loading: actionLoading, error: actionError } = useMovementsActions();
    const [selectedMovement, setSelectedMovement] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (Account && accountId !== Account) {
            navigate(`/movimientos/${Account}`, { replace: true });
        }
    }, [Account, accountId, navigate]);

    const handleActionClick = (movement) => {
        setSelectedMovement(movement);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedMovement(null);
    };

    const handleUpdate = async (newAmount) => {
        await updateMovement(selectedMovement._id, Number(newAmount));
        handleDialogClose();
        refetch();
    };

    const handleRevert = async () => {
        await revertMovement(selectedMovement._id);
        handleDialogClose();
        refetch();
    };

    if (loading) return <div>Cargando movimientos recientes...</div>;

    return (
        <div className="bg-blue-50 rounded-xl shadow-lg p-4 md:p-8 mx-auto my-6 w-full overflow-x-auto">
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                <Autocomplete
                    id="Account"
                    options={accounts}
                    getOptionLabel={(acc) => acc ? `${acc.accountNumber} - ${acc.accountType}` : ""}
                    value={accounts.find(acc => acc.accountNumber === Account) || null}
                    onChange={(_, newValue) => setAccount(newValue ? newValue.accountNumber : "")}
                    loading={loading}
                    disabled={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cuenta"
                            required
                            margin="normal"
                        />
                    )}
                />
            </Box>
            <div className="min-w-[1800px] w-full" style={{ height: "700px" }}>
                <DataGrid
                    rows={movements ? movements.map(mov => ({ ...mov, onActionClick: handleActionClick })) : []}
                    columns={columns}
                    getRowId={(row) => row._id || row.id || row.date + row.amount}
                    loading={loading}
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
            <MovementActionsDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                movement={selectedMovement}
                onUpdate={handleUpdate}
                onRevert={handleRevert}
                loading={actionLoading}
                error={actionError}
            />
        </div>
    )
}
