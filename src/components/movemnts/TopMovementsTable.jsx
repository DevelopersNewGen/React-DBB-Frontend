import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

export const TopMovementsTable = ({ topAccounts = [] }) => (
  <TableContainer component={Paper}>
    <Typography variant="h6" sx={{ p: 2 }}>
      Cuentas con más movimientos
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Usuario</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Número de Cuenta</TableCell>
          <TableCell>Tipo de Cuenta</TableCell>
          <TableCell>Total Movimientos</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {topAccounts.map((item, idx) => (
          <TableRow key={item.account?._id || idx}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{item.owner?.name || '-'}</TableCell>
            <TableCell>{item.owner?.username || '-'}</TableCell>
            <TableCell>{item.owner?.email || '-'}</TableCell>
            <TableCell>{item.account?.accountNumber || '-'}</TableCell>
            <TableCell>{item.account?.accountType || '-'}</TableCell>
            <TableCell>{item.totalMovements}</TableCell>
          </TableRow>
        ))}
        {topAccounts.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No hay datos para mostrar.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);
