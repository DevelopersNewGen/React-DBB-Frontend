import React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
    TablePagination, TextField, Box, IconButton, Tooltip, Snackbar, Alert
} from "@mui/material";
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

export const MovementsTable = ({role}) => {
    const {
        page, setPage, rowsPerPage, setRowsPerPage, total, loading,
        search, setSearch, filteredMovements,
        selectedMovement, dialogOpen,
        successMsg, setSuccessMsg, errorMsg, setErrorMsg,
        handleActionClick, handleDialogClose, handleUpdate, handleRevert,
        actionLoading, actionError
    } = useMovementsTable(role);

    return (
        <Paper sx={{
            width: "100%",
            overflowX: "auto",
            background: "#fff",   // Fondo blanco
            color: "#222",        // Letra oscura
            mt: 5                // Espacio superior para separar del navbar
        }}>
            <Box sx={{ p: 2 }}>
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
            <TableContainer sx={{ background: "transparent" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: "#f5f5f5" }}>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Monto</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Tipo</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Descripción</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Saldo después</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Cuenta Origen</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Cuenta Destino</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Estatus</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Fecha</TableCell>
                            <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ color: "#222" }}>
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : filteredMovements.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ color: "#222" }}>
                                    No hay movimientos para mostrar.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredMovements.map((mov, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{
                                        background: "#fff",
                                        '&:hover': { background: "#e3f2fd" }
                                    }}
                                >
                                    <TableCell sx={{ color: "#222", fontSize: "15px" }}>${mov.amount}</TableCell>
                                    <TableCell>
                                        <Chip label={mov.type} color={typeColors[mov.type] || "default"} size="small" />
                                    </TableCell>
                                    <TableCell sx={{ color: "#222", fontSize: "15px" }}>{mov.description || "-"}</TableCell>
                                    <TableCell sx={{ color: "#222", fontSize: "15px" }}>${mov.balanceAfter}</TableCell>
                                    <TableCell sx={{ color: "#222", fontSize: "15px" }}>
                                        {mov.originAccount
                                            ? (typeof mov.originAccount === "object" && mov.originAccount !== null
                                                ? mov.originAccount.accountNumber || mov.originAccount._id
                                                : mov.originAccount)
                                            : "-"}
                                    </TableCell>
                                    <TableCell sx={{ color: "#222", fontSize: "15px" }}>
                                        {mov.destinationAccount
                                            ? (typeof mov.destinationAccount === "object" && mov.destinationAccount !== null
                                                ? mov.destinationAccount.accountNumber || mov.destinationAccount._id
                                                : mov.destinationAccount)
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={mov.status} color={statusColors[mov.status] || "default"} size="small" />
                                    </TableCell>
                                    <TableCell sx={{ color: "#222", fontSize: "15px" }}>
                                        {mov.date ? new Date(mov.date).toLocaleString() : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {role === "ADMIN_ROLE" && mov.type === "DEPOSIT" && mov.status !== "REVERTED" && (
                                            <Tooltip title="Actualizar/Revertir">
                                                <span>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleActionClick(mov)}
                                                        sx={{ color: "#1976d2" }}
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
                sx={{
                    background: "#f5f5f5",
                    color: "#222",
                    '& .MuiTablePagination-toolbar': { color: "#222" },
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: "#222" },
                    '& .MuiTablePagination-actions': { color: "#222" },
                    '& .MuiInputBase-root': { color: "#222" },
                }}
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