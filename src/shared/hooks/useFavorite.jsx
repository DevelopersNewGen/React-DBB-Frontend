import { useState, useEffect, useCallback } from "react";
import { getUserFavorites, addFavoriteAccount } from "../../services/api";

export const useFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Listar favoritos
  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getUserFavorites();
    if (res.error) {
      setError(res.e || "Error al obtener favoritos");
      setFavorites([]);
    } else {
      setFavorites(res.data || []);
    }
    setLoading(false);
  }, []);

  // Agregar favorito
  const addFavorite = async ({ accountNumber, alias }) => {
    setLoading(true);
    setError(null);
    const res = await addFavoriteAccount({ accountNumber, alias });
    if (res.error) {
      setError(res.e || "Error al agregar favorito");
    } else {
      fetchFavorites();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
  };
};
