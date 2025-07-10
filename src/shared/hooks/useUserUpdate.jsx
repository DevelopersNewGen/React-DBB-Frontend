import { useState } from "react";
import { updateUser as updateUserApi } from "../../services/api.jsx";

export const useUserUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateUser = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateUserApi(data);
      if (res.error) throw res.e;
      setSuccess(true);
      return res.data.user;
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Error al actualizar usuario");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, loading, error, success };
};