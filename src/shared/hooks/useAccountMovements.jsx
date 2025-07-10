import { useState, useEffect, useCallback } from "react";
import { getAccountMovements } from "../../services/api";

export const useAccountMovements = (accountId, page = 0, rowsPerPage = 10) => {
  const [movements, setMovements] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMovements = useCallback(async () => {
    if (!accountId) return;
    setLoading(true);
    const from = page * rowsPerPage;
    const res = await getAccountMovements(accountId, from, rowsPerPage);
    setMovements(res.data?.movements || []);
    setTotal(res.data?.total || 0);
    setLoading(false);
  }, [accountId, page, rowsPerPage]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return { movements, total, loading };
};