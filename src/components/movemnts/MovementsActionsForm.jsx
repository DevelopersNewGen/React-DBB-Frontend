import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Alert } from "@mui/material";

export function MovementActionsDialog({
    open,
    onClose,
    movement,
    onUpdate,
    onRevert,
    loading,
    error
}) {
    const [newAmount, setNewAmount] = useState(movement?.amount || "");

    // Actualiza el monto si cambia el movimiento
    React.useEffect(() => {
        setNewAmount(movement?.amount || "");
    }, [movement]);

    if (!movement) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Acciones sobre el movimiento</DialogTitle>
            <DialogContent>
                <div>
                    <strong>Monto actual:</strong> ${movement.amount}
                </div>
                <TextField
                    label="Nuevo monto"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                    disabled={loading}
                />
                {error && <Alert severity="error">{error.message || "Error"}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button
                    onClick={() => onUpdate(newAmount)}
                    color="primary"
                    disabled={loading || Number(newAmount) <= 0}
                >
                    {loading ? <CircularProgress size={20} /> : "Actualizar"}
                </Button>
                <Button
                    onClick={onRevert}
                    color="error"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} /> : "Revertir"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}