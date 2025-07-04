import { useState } from "react";
import { updateDepositAmount, revertDepositAmount } from "../../services/api.jsx";

export function useMovementsActions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Recibe el ID del movimiento y el nuevo monto
    const updateMovement = async (movementId, newAmount) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateDepositAmount(movementId, { newAmount });
            setLoading(false);
            return res.data;
        } catch (e) {
            setError(e);
            setLoading(false);
            return null;
        }
    };

    // Recibe el ID del movimiento para revertir
    const revertMovement = async (movementId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await revertDepositAmount(movementId);
            setLoading(false);
            return res.data;
        } catch (e) {
            setError(e);
            setLoading(false);
            return null;
        }
    };

    return { updateMovement, revertMovement, loading, error };
}