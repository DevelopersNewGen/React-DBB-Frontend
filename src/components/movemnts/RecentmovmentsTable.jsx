import React, { useEffect, useState } from 'react'
import { useRecentMovements } from '../../shared/hooks/useRecentMovements.jsx'
import { useUserAccounts } from '../../shared/hooks/useUserAccounts.jsx'
import { Autocomplete, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

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

const RecentMovementsTableInternal = ({ movements }) => (
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
    </TableContainer>
);

export const RecentmovmentsTable = () => {
    const navigate = useNavigate();
    const { accountId } = useParams();
    const { accounts } = useUserAccounts();
    const [Account, setAccount] = useState(accountId || "");
    const { movements, loading, error, refetch } = useRecentMovements(Account);

    useEffect(() => {
        if (Account && accountId !== Account) {
            navigate(`/movimientos/${Account}`, { replace: true });
        }
    }, [Account, accountId, navigate]);

    if (loading) return <div>Cargando movimientos recientes...</div>;

    return (
        <div>
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
            <RecentMovementsTableInternal movements={movements} />
        </div>
    )
}
