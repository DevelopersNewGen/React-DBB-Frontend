import { useState } from "react";
import { updateDepositAmount, revertDepositAmount } from "../../services/api.jsx";

export function useMovementsActions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateMovement = async (mid, newAmount) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateDepositAmount(mid, { newAmount });
            setLoading(false);
            return res.data;
        } catch (e) {
            setError(e);
            setLoading(false);
            return null;
        }
    };

    const revertMovement = async (mid) => {
        setLoading(true);
        setError(null);
        try {
            const res = await revertDepositAmount(mid, {});
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