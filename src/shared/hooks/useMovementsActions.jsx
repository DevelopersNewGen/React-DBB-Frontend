import { useState } from "react";
import { updateDepositAmount, revertDepositAmount } from "../../services/api.jsx";

export function useMovementsActions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateMovement = async (accountNumber, newAmount) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateDepositAmount(accountNumber, { newAmount });
            setLoading(false);
            return res.data;
        } catch (e) {
            setError(e);
            setLoading(false);
            return null;
        }
    };

    const revertMovement = async (accountNumber) => {
        setLoading(true);
        setError(null);
        try {
            const res = await revertDepositAmount(accountNumber);
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