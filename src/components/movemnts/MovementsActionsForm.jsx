import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    CircularProgress,
    Alert,
    Slide,
} from "@mui/material";

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
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Slide}
            transitionDuration={400}
            sx={{
                '& .MuiBackdrop-root': {
                    background: 'rgba(30, 41, 59, 0.5)', // fondo overlay semitransparente
                    backdropFilter: 'blur(3px)',         // desenfoque
                },
                '& .MuiPaper-root': {
                    borderRadius: 4,
                    boxShadow: 8,
                    background: '#fff',
                    px: 2,
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 700, color: "#1976d2" }}>
                Acciones sobre el movimiento
            </DialogTitle>
            <DialogContent>
                <div>
                    <strong>Monto actual:</strong>
                    <span style={{
                        fontFamily: "monospace",   // Cambia la fuente aquí
                        fontWeight: "bold",
                        color: "#1976d2",
                        fontSize: "1.2rem",
                        marginLeft: 6
                    }}>
                        ${movement.amount}
                    </span>
                </div>
                <TextField
                    label="Nuevo monto"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                    disabled={loading}
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
                {error && <Alert severity="error" sx={{ mt: 1 }}>{error.message || "Error"}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                    variant="outlined"
                    color="inherit"
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => onUpdate(newAmount)}
                    color="primary"
                    disabled={loading || Number(newAmount) <= 0}
                    variant="contained"
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    {loading ? <CircularProgress size={20} /> : "Actualizar"}
                </Button>
                <Button
                    onClick={onRevert}
                    color="error"
                    disabled={loading}
                    variant="contained"
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    {loading ? <CircularProgress size={20} /> : "Revertir"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}