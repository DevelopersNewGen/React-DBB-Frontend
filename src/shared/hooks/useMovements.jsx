import { useState, useEffect, useCallback } from "react";
import { getAllMovements } from "../../services";

export const useMovements = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
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
  }, [page, rowsPerPage]);

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

