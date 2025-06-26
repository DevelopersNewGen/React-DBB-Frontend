import { useState, useEffect } from "react";
import { getAccounts } from "../../services/api.jsx";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        if (!response.error) {
          const accountsWithUser = response.data.accounts.map((account) => ({
            ...account,
            userName: account.user?.name || "Sin usuario",
          }));
          setAccounts(accountsWithUser);
        } else {
          console.error("Error fetching accounts:", response.e);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, loading };
};