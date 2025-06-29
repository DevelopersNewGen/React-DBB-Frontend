import React, { useState, useMemo } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
    TablePagination, TextField, Box
} from "@mui/material";
import { useMovements } from "../../shared/hooks/useMovements";

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
    const { response, page, setPage, rowsPerPage, setRowsPerPage, total, loading } = useMovements(role);
    const [search, setSearch] = useState("");

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

    return (
        <Paper>
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
                />
            </Box>
            <TableContainer>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : filteredMovements.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
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
        </Paper>
    );
};

