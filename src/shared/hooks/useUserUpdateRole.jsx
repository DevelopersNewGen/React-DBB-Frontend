import { useState } from "react";
import { updateRole } from "../../services/api.jsx";

export const useUserUpdateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeUserRole = async (uid, newRole) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateRole(uid, newRole);
      if (res.error) throw res.e;
      return true;
    } catch (e) {
      setError(e?.message || "Error al cambiar el rol");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changeUserRole, loading, error };
};