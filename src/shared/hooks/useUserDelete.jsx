import { useState } from "react";
import { deleteUserAdmin } from "../../services/api.jsx";

export const useUserDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteUserAdmin(uid);
      if (res.error) throw res.e;
      return true;
    } catch (e) {
      setError(e?.message || "Error al eliminar usuario");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};