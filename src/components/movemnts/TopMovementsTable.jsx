import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

export const TopMovementsTable = ({ topAccounts = [] }) => (
  <TableContainer component={Paper}
    sx={{
      background: "#fff",
      color: "#222",
      mt: 5, // Espacio superior
      boxShadow: 3,
      borderRadius: 3
    }}
  >
    <Typography variant="h6" sx={{ p: 2, color: "#1976d2", fontWeight: "bold", fontSize: "20px" }}>
      Cuentas con más movimientos
    </Typography>
    <Table>
      <TableHead>
        <TableRow sx={{ background: "#f5f5f5" }}>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>#</TableCell>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Nombre</TableCell>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Usuario</TableCell>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Email</TableCell>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Número de Cuenta</TableCell>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Tipo de Cuenta</TableCell>
          <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "16px" }}>Total Movimientos</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {topAccounts.map((item, idx) => (
          <TableRow
            key={item.account?._id || idx}
            sx={{
              background: "#fff",
              '&:hover': { background: "#e3f2fd" }
            }}
          >
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{idx + 1}</TableCell>
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{item.owner?.name || '-'}</TableCell>
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{item.owner?.username || '-'}</TableCell>
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{item.owner?.email || '-'}</TableCell>
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{item.account?.accountNumber || '-'}</TableCell>
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{item.account?.accountType || '-'}</TableCell>
            <TableCell sx={{ color: "#222", fontSize: "15px" }}>{item.totalMovements}</TableCell>
          </TableRow>
        ))}
        {topAccounts.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} align="center" sx={{ color: "#222", fontSize: "15px" }}>
              No hay datos para mostrar.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);