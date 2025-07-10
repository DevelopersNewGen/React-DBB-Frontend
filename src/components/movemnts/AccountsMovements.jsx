import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination } from "@mui/material";
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

    return (
        <TableContainer component={Paper}>
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
                    {movements && movements.length > 0 ? (
                        movements.map((mov, idx) => (
                            <TableRow key={idx}>
                                <TableCell>${mov.amount}</TableCell>
                                <TableCell>
                                    <Chip label={mov.type} color={typeColors[mov.type] || "default"} size="small" />
                                </TableCell>
                                <TableCell>{mov.description || "-"}</TableCell>
                                <TableCell>${mov.balanceAfter}</TableCell>
                                <TableCell>
                                    {mov.originAccount
                                        ? (typeof mov.originAccount === "object"
                                            ? mov.originAccount.accountNumber || mov.originAccount._id
                                            : mov.originAccount)
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    {mov.destinationAccount
                                        ? (typeof mov.destinationAccount === "object"
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
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} align="center">
                                No hay movimientos para mostrar.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
};