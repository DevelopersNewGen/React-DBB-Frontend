import { useState } from "react";
import { makeDeposit } from "../../services/api.jsx";

const useMakeDeposit = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const deposit = async (depositData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const response = await makeDeposit(depositData);
      if (response?.data && !response.error) {
        setSuccess(true);
        return response.data;
      } else {
        setError(response?.e || "Error desconocido");
      }
    } catch (e) {
      setError(e.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { deposit, loading, success, error };
};

export default useMakeDeposit;