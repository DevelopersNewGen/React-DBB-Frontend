import { useState } from "react";
import { makeTransfer } from "../../services/api";
import toast from "react-hot-toast";

export const useTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTransfer = async ({
    originAccount,
    destinationAccount,
    amount,
    description,
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const transferData = {
        destinationAccount,
        amount: Number(amount),
        description,
      };

      const response = await makeTransfer(originAccount, transferData); // ✅ fix

      if (response?.data && !response.error) {
        setSuccess(true);
        toast.success(response.data.msg || "Transferencia realizada");
        return response.data;
      } else {
        setError(
          response?.data?.msg ||
            response?.data?.error ||
            response?.e?.response?.data?.msg ||
            response?.e?.response?.data?.error ||
            response?.e?.message ||
            "Error al transferir"
        );
        toast.error("Error al transferir");
      }
    } catch (e) {
      setError(e.message || "Error al transferir");
      toast.error(e.message || "Error al transferir");
    } finally {
      setLoading(false);
    }
  };

  return { handleTransfer, loading, error, success };
};
