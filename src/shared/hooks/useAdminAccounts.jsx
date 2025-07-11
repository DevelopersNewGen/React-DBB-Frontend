import { useState, useEffect } from "react";
import { getAccounts } from "../../services/api";

export const useAdminAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsResponse = await getAccounts();
        setAccounts(accountsResponse?.data?.accounts || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, loading, error, isAdmin: true };
};

