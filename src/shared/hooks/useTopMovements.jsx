import { useState, useEffect } from "react";
import { getTopMovements } from "../../services/api"; // Ajusta la ruta si es necesario

export const useTopMovements = () => {
    const [topAccounts, setTopAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTopMovements = async () => {
        setLoading(true);
        setError(null);
        try {
        const res = await getTopMovements();
        if (res.error) {
            setError(res.e?.response?.data?.msg || "Error al obtener top movimientos");
            setTopAccounts([]);
        } else {
            setTopAccounts(res.data.topAccounts || []);
        }
        } catch (e) {
        setError(e?.message || "Error inesperado");
        setTopAccounts([]);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopMovements();
    }, []);

    return { 
        topAccounts, 
        loading, error, 
        refetch: fetchTopMovements 
    };
};
