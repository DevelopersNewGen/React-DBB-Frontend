import { useState, useEffect } from "react";
import { getMyRecentMovements } from "../../services/api";

export const useRecentMovements = (accountNumber) => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentMovements = async () => {
    if (!accountNumber) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getMyRecentMovements(accountNumber);
      if (res.error) {
        setError(res.e?.response?.data?.msg || "Error al obtener movimientos recientes");
        setMovements([]);
      } else {
        setMovements(res.data.movements || []);
      }
    } catch (e) {
      setError(e?.message || "Error inesperado");
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentMovements();
  }, [accountNumber]);

  return { movements, loading, error, refetch: fetchRecentMovements };
};