import { useState } from "react";
import { updateUserPassword as updateUserPasswordApi } from "../../services/api.jsx";

export const useUserPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateUserPassword = async (
    { contraActual, nuevaContra, confirmacionContra }
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await updateUserPasswordApi({
        contraActual,
        nuevaContra,
        confirmacionContra,
      });
      if (res.error) throw res.e;
      setSuccess(res.data.message || "Contraseña actualizada exitosamente");
      return true;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.msg ||
          err?.message ||
          "Error al actualizar la contraseña"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateUserPassword, loading, error, success, setError, setSuccess };
};