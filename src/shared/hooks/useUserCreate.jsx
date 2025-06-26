import { useState } from "react";
import { createUser } from "../../services/api";

export const useUserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await createUser(userData);
      if (response?.data && !response.error) {
        setSuccess(true);
        return response.data;
      } else {
        
        const errors =
          response?.data?.errors ||
          response?.e?.response?.data?.errors;
        if (errors) {
          setError(errors);
        } else {
          setError(
            response?.data?.msg ||
            response?.data?.error ||
            response?.e?.response?.data?.msg ||
            response?.e?.response?.data?.error ||
            response?.e?.message ||
            "Error al crear usuario"
          );
        }
      }
    } catch (e) {
      
      const errors =
        e?.response?.data?.errors;
      if (errors) {
        setError(errors);
      } else {
        setError(e.message || "Error al crear usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateUser, loading, error, success };
};