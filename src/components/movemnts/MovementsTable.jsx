import React, { useState, useMemo } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
    TablePagination, TextField, Box, IconButton, Tooltip, Snackbar, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMovements } from "../../shared/hooks/useMovements";
import { MovementActionsDialog } from "./MovementsActionsForm.jsx";
import { useMovementsActions } from "../../shared/hooks/useMovementsActions.jsx";
import { useNavigate } from "react-router-dom";

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

export const MovementsTable = ({role}) => {
    const { response, page, setPage, rowsPerPage, setRowsPerPage, total, loading, refetch } = useMovements(role);
    const [search, setSearch] = useState("");

    const { updateMovement, revertMovement, loading: actionLoading, error: actionError } = useMovementsActions();
    const [selectedMovement, setSelectedMovement] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const filteredMovements = useMemo(() => {
        const s = search.toLowerCase();
        return response.filter((mov) =>
            (mov.description || "").toLowerCase().includes(s) ||
            (mov.type || "").toLowerCase().includes(s) ||
            (mov.status || "").toLowerCase().includes(s) ||
            (
                mov.originAccount
                    ? (typeof mov.originAccount === "object" && mov.originAccount !== null
                        ? (mov.originAccount.accountNumber || mov.originAccount._id || "")
                        : mov.originAccount)
                    : ""
            ).toString().toLowerCase().includes(s) ||
            (
                mov.destinationAccount
                    ? (typeof mov.destinationAccount === "object" && mov.destinationAccount !== null
                        ? (mov.destinationAccount.accountNumber || mov.destinationAccount._id || "")
                        : mov.destinationAccount)
                    : ""
            ).toString().toLowerCase().includes(s)
        );
    }, [response, search]);

    // Cambiado: primero navega, luego abre el diálogo
    const handleActionClick = (movement) => {
        if (movement && movement._id) {
            navigate(`/movements/${movement._id}`);
        }
        setSelectedMovement(movement);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedMovement(null);
    };

    const handleUpdate = async (newAmount) => {
        const accountNumber = selectedMovement?.destinationAccount?.accountNumber;
        
        if (!accountNumber) {
            setErrorMsg("No se encontró el número de cuenta para este movimiento.");
            handleDialogClose();
            return;
        }

        const res = await updateMovement(accountNumber, Number(newAmount));
        if (res && !actionError) {
            setSuccessMsg("Movimiento actualizado correctamente");
            await refetch();
        } else {
            setErrorMsg("Error al actualizar el movimiento");
        }
        handleDialogClose();
    };

    const handleRevert = async () => {
        const accountNumber = selectedMovement?.destinationAccount?.accountNumber;
        
        if (!accountNumber) {
            setErrorMsg("No se encontró el número de cuenta para este movimiento.");
            handleDialogClose();
            return;
        }

        const res = await revertMovement(accountNumber);
        if (res && !actionError) {
            setSuccessMsg("Movimiento revertido correctamente");
            await refetch();
        } else {
            setErrorMsg("Error al revertir el movimiento");
        }
        handleDialogClose();
    };

    return (
        <Paper sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ p: 2, minWidth: 1200 }}>
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
                />
            </Box>
            <TableContainer sx={{ minWidth: 1200 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Monto</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Saldo después</TableCell>
                            <TableCell>Cuenta Origen</TableCell>
                            <TableCell>Cuenta Destino</TableCell>
                            <TableCell>Estatus</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : filteredMovements.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No hay movimientos para mostrar.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredMovements.map((mov, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>${mov.amount}</TableCell>
                                    <TableCell>
                                        <Chip label={mov.type} color={typeColors[mov.type] || "default"} size="small" />
                                    </TableCell>
                                    <TableCell>{mov.description || "-"}</TableCell>
                                    <TableCell>${mov.balanceAfter}</TableCell>
                                    <TableCell>
                                        {mov.originAccount
                                            ? (typeof mov.originAccount === "object" && mov.originAccount !== null
                                                ? mov.originAccount.accountNumber || mov.originAccount._id
                                                : mov.originAccount)
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {mov.destinationAccount
                                            ? (typeof mov.destinationAccount === "object" && mov.destinationAccount !== null
                                                ? mov.destinationAccount.accountNumber || mov.destinationAccount._id
                                                : mov.destinationAccount)
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={mov.status} color={statusColors[mov.status] || "default"} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        {mov.date ? new Date(mov.date).toLocaleString() : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {role === "ADMIN_ROLE" && mov.type === "DEPOSIT" && mov.status !== "REVERTED" && (
                                            <Tooltip title="Actualizar/Revertir">
                                                <span>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleActionClick(mov)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={e => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage="Filas por página"
            />
            <MovementActionsDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                movement={selectedMovement}
                onUpdate={handleUpdate}
                onRevert={handleRevert}
                loading={actionLoading}
                error={actionError}
            />
            <Snackbar
                open={!!successMsg}
                autoHideDuration={3000}
                onClose={() => setSuccessMsg("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setSuccessMsg("")} severity="success" sx={{ width: '100%' }}>
                    {successMsg}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!errorMsg}
                autoHideDuration={3000}
                onClose={() => setErrorMsg("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setErrorMsg("")} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Paper>
    );
};
