import { useState } from "react";
import { makeWithdrawal } from "../../services";

const useMakeWithdrawal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const withdraw = async (withdrawalData) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await makeWithdrawal(withdrawalData);
      if (res.error) {
        setError(res.e?.response?.data?.msg || "Error al realizar el retiro");
      } else {
        setResponse(res.data);
      }
    } catch (e) {
      setError(e?.response?.data?.msg || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return { withdraw, loading, error, response };
};

export default useMakeWithdrawal;