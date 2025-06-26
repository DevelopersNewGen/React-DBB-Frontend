import { useState } from "react";
import { updateUserAdmin } from "../../services";

export const useUserUpdateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateUserAdmin = async (uid, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await updateUserAdmin(uid, data);
      if (response?.data && !response.error) {
        setSuccess(true);
        return response.data;
      } else {
        setError(
          response?.data?.msg ||
          response?.data?.error ||
          response?.e?.response?.data?.msg ||
          response?.e?.response?.data?.error ||
          response?.e?.message ||
          "Error al actualizar usuario"
        );
      }
    } catch (e) {
      setError(e.message || "Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUserAdmin, loading, error, success };
};