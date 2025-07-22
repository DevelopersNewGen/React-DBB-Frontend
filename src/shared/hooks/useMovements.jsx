import { useState, useEffect, useCallback } from "react";
import { getAllMovements, getUserMovements } from "../../services";

export const useMovements = (role) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchMovements = useCallback(async () => {
    if (!role) return; 
    setLoading(true);
    setError(null);
    try {
      if (role !== "ADMIN_ROLE") {
        const res = await getUserMovements(page, rowsPerPage);
        if (res.error) {
          setError(res.e?.response?.data?.msg || "Error al listar movimientos");
          setResponse([]);
          return;
        }
        setResponse(res.data.movements || []);
        setTotal(res.data.total);
        return;
      }
      const res = await getAllMovements(page, rowsPerPage);
      if (res.error) {
        setError(res.e?.response?.data?.msg || "Error al listar movimientos");
        setResponse([]);
      } else {
        setResponse(res.data.movements || []);
        setTotal(res.data.total);
      }
    } catch (e) {
      setError(e?.response?.data?.msg || "Error inesperado");
      setResponse([]);
    } finally {
      setLoading(false);
    }
  }, [role, page, rowsPerPage]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return {
    loading,
    error,
    response,
    refetch: fetchMovements,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    total
  };  
};

